"use client"

import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface CartContextType {
    addToCart: (variantId: string, quantity?: number) => Promise<any>;
    getUserCart: () => Promise<any>;
    updateCartItemQuantity: (cartItemId: string, quantity: number) => Promise<any>;
    removeCartItem: (cartItemId: string) => Promise<any>
}

export const cartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: { children: ReactNode }){

    const [cartItems, setCartItems] = useState(null);

    function addToCart(variantId: any, quantity = 1){
        return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/items`,
            {
            variantId,
            quantity
            },
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }

    function getUserCart(){
        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }

    function updateCartItemQuantity(cartItemId: string, quantity: number){
        return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cart/items/${cartItemId}`,
            {quantity},
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }

    function removeCartItem(cartItemId: string){
        return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/items/${cartItemId}`,
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }

    
    return(
        <cartContext.Provider value={{addToCart, getUserCart, updateCartItemQuantity, removeCartItem}}>
            {children}
        </cartContext.Provider>
    )
}