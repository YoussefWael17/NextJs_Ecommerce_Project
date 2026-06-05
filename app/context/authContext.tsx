"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../redux/services/adminsApi";
import { jwtDecode } from "jwt-decode";



type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
};

export let authContext = createContext<AuthContextType | null>(null);



export function AuthContextProvider({ children }: { children: ReactNode }){

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (!token){
            setLoading(false);
            return;
        }
        try {
            const decoded = jwtDecode<User>(token);
            console.log(decoded)
            setUser(decoded);
        } catch (error) {
            console.error("Invalid token", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return(
        <authContext.Provider value={{user, setUser, loading}}>
            {children}
        </authContext.Provider>
    )
}