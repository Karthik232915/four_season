import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { toast } from 'sonner';

interface WishlistState {
  items: string[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'LOAD_WISHLIST'; payload: string[] };

const WishlistContext = createContext<{
  state: WishlistState;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
} | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.includes(action.payload)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((id) => id !== action.payload) };

    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(savedWishlist) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (productId: string) => {
    dispatch({ type: 'ADD_ITEM', payload: productId });
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return state.items.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ state, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
