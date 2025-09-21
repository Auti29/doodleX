'use client'

import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar"
import { Room } from "./page";
import axios from "axios";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

interface User {
    username: string,
    id: string, 
    email: string, 
    rooms: Room[]
}

export const LayoutContext = React.createContext<{
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    noToken: boolean,
    setNoToken: React.Dispatch<React.SetStateAction<boolean>>
}>({
    user: 
        {
        username: "johndoe", 
        id: "123123", 
        email: "johndoe@hotmail.com", 
        rooms: []
    },
    setUser: () => {},
    noToken: false,
    setNoToken: () => {}
})

export default function Layout({children}: {children: React.ReactNode}) {
        const [user, setUser] = useState<{
            username: string,
            id: string, 
            email: string, 
            rooms: Room[]
        }>({
            username: "johndoe", 
            id: "123123", 
            email: "johndoe@hotmail.com", 
            rooms: []
        });
        const[noToken, setNoToken] = useState<boolean>(false);
    
            useEffect(() => {
                
                let token: string | null = "";
                if(typeof window !== undefined){
                    token = localStorage.getItem('token');
                }
                async function fetchUser() {
                    if(!token) {
                        setNoToken(true);
                        return;
                    }
                    const res = await axios.get(`${BACKEND_API}/api/v1/getUser`, {
                    headers: {
                        Authorization:`Bearer ${token}`
                    }});
                    const data = res.data;
                    setUser(data.user);
                } 
        
                fetchUser();
            }, []);
        
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <LayoutContext.Provider value={{user, setUser, noToken, setNoToken}}>
                <NavBar />
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </LayoutContext.Provider>
        </div>

    )
}