"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  ngo_addToCart: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  ngo_removeFromCart: (id: string | number) => void;
  ngo_updateQuantity: (id: string | number, delta: number) => void;
  ngo_clearCart: () => void;
  ngo_getCartTotal: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const NgoCartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ngo_hydrated, setNgoHydrated] = useState(false);

  useEffect(() => {
    const ngo_savedCart = localStorage.getItem("ngo_cart");
    if (ngo_savedCart) {
      try { setCartItems(JSON.parse(ngo_savedCart)); } catch(e) {}
    }
    setNgoHydrated(true);
  }, []);

  useEffect(() => {
    if (ngo_hydrated) {
      localStorage.setItem("ngo_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, ngo_hydrated]);

  const ngo_addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => {
    setCartItems(prev => {
      const ngo_existingItem = prev.find(i => i.id === item.id);
      if (ngo_existingItem) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
    toast.success(`Addition Successful! Thank you for selecting ${item.name}.`);
  };

  const ngo_removeFromCart = (id: string | number) => {
    setCartItems(prev => {
      const ngo_targetItem = prev.find(i => i.id === id);
      if (ngo_targetItem) toast.success(`Removing successful! Thank you for updating your cart.`);
      return prev.filter(i => i.id !== id);
    });
  };

  const ngo_updateQuantity = (id: string | number, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        const ngo_newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: ngo_newQty };
      }
      return i;
    }));
  };

  const ngo_clearCart = () => {
    setCartItems([]);
    toast.success("Clearing successful! Thank you for your time");
  };

  const ngo_getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <NgoCartContext.Provider value={{
      cartItems, ngo_addToCart, ngo_removeFromCart, ngo_updateQuantity, ngo_clearCart, ngo_getCartTotal,
      isCartOpen, setIsCartOpen
    }}>
      {children}
    </NgoCartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(NgoCartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
