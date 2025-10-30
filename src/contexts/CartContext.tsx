import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  gst: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; colorName: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, colorName: string, size: string) => void;
  updateQuantity: (productId: string, colorName: string, size: string, quantity: number) => void;
  clearCart: () => void;
} | undefined>(undefined);

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.retailPrice * item.quantity, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, gst, total, itemCount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.color.name === action.payload.color.name &&
          item.size.size === action.payload.size.size
      );

      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        newItems = [...state.items, action.payload];
      }

      return { ...state, items: newItems, ...calculateTotals(newItems) };

    case 'REMOVE_ITEM':
      newItems = state.items.filter((item) => {
        const itemKey = `${item.product.id}-${item.color.name}-${item.size.size}`;
        return itemKey !== action.payload;
      });
      return { ...state, items: newItems, ...calculateTotals(newItems) };

    case 'UPDATE_QUANTITY':
      newItems = state.items.map((item) => {
        if (
          item.product.id === action.payload.productId &&
          item.color.name === action.payload.colorName &&
          item.size.size === action.payload.size
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return { ...state, items: newItems, ...calculateTotals(newItems) };

    case 'CLEAR_CART':
      return { items: [], itemCount: 0, subtotal: 0, gst: 0, total: 0 };

    case 'LOAD_CART':
      return { ...state, items: action.payload, ...calculateTotals(action.payload) };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    itemCount: 0,
    subtotal: 0,
    gst: 0,
    total: 0,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success('Added to cart', {
      description: `${item.product.name} - ${item.color.name}, ${item.size.size}`,
    });
  };

  const removeFromCart = (productId: string, colorName: string, size: string) => {
    const itemKey = `${productId}-${colorName}-${size}`;
    dispatch({ type: 'REMOVE_ITEM', payload: itemKey });
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId: string, colorName: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName, size);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, colorName, size, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
