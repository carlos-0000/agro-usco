'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    unitOfMeasure: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
