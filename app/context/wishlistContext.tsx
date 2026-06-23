"use client"

import axios from "axios";
import { createContext, ReactNode, useState } from "react";

interface WishlistContextType {
    addItemToWishlist: (variantId: string) => Promise<any>;
    getUserWishlist: () => Promise<any>;
    removeWishlistItem: (wishlistItemId: string) => Promise<any>
}

export const wishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistContextProvider({ children }: { children: ReactNode }){

    function addItemToWishlist(variantId: any){
        return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/items`,
            {
                variantId,
            },
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }

    function getUserWishlist(){
        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }


    function removeWishlistItem(wishlistItemId: string){
        return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/items/${wishlistItemId}`,
            {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        ).then((res)=> res)
        .catch((err)=> err)
    }

    
    return(
        <wishlistContext.Provider value={{addItemToWishlist, getUserWishlist, removeWishlistItem}}>
            {children}
        </wishlistContext.Provider>
    )
}