import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from '../types';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { user: User; firebaseUser: FirebaseUser } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_USER'; payload: User };

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  updateUser: (user: User) => void;
} | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        firebaseUser: action.payload.firebaseUser,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    firebaseUser: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        // Fetch user data from localStorage or Firestore
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch({ 
            type: 'LOGIN', 
            payload: { 
              user: userData, 
              firebaseUser 
            } 
          });
        } else {
          // Create basic user object from Firebase user
          const userData: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            phone: '',
            type: 'individual',
            customerType: 'individual',
            addresses: [],
            createdAt: new Date().toISOString(),
            orders: [],
            wishlist: [],
            status: 'active'
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          
          dispatch({ 
            type: 'LOGIN', 
            payload: { 
              user: userData, 
              firebaseUser 
            } 
          });
        }
      } else {
        // User is signed out
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get or create user data
      const storedUser = localStorage.getItem('user');
      let userData: User;
      
      if (storedUser) {
        userData = JSON.parse(storedUser);
      } else {
        userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          phone: '',
          type: 'individual',
          customerType: 'individual',
          addresses: [],
          createdAt: new Date().toISOString(),
          orders: [],
          wishlist: [],
          status: 'active',
        };
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      dispatch({ 
        type: 'LOGIN', 
        payload: { user: userData, firebaseUser } 
      });
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(error.message || 'Login failed');
    }
  };

  // Signup function
  const signup = async (email: string, password: string, userData: Partial<User>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const newUser: User = {
        id: firebaseUser.uid,
        name: userData.name || '',
        email: firebaseUser.email || '',
        phone: userData.phone || '',
        type: userData.type || 'individual',
        customerType: userData.type || 'individual',
        companyName: userData.companyName,
        gstNumber: userData.gstNumber,
        addresses: [],
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: [],
        status: 'active',
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      
      dispatch({ 
        type: 'LOGIN', 
        payload: { user: newUser, firebaseUser } 
      });
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(error.message || 'Signup failed');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
      dispatch({ type: 'LOGOUT' });
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  // Update user function
  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signup, updateUser }}>
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};