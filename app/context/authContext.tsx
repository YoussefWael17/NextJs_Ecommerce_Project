"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../redux/services/adminsApi";
import { jwtDecode } from "jwt-decode";



type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export let authContext = createContext<AuthContextType | null>(null);



export function AuthContextProvider({ children }: { children: ReactNode }){

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (!token) return;

        try {
            const decoded = jwtDecode<User>(token);
            console.log(decoded)
            setUser(decoded);
        } catch (error) {
            console.error("Invalid token", error);
        }
    }, []);

    return(
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    )
}