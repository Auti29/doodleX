"use client"

import { useEffect, useState } from "react";
import CreateRoomComponent from "../components/CreateRoomComponent";
import NavBar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import axios from "axios";
import Link from "next/link";
import MainSideBar from "../components/MainSideBar";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

export interface Room {
    id: number, 
    slug: string, 
    adminId: string, 
    createdAt: Date
}


export default function Dashboard() {
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
        <div className="bg-gray-900 text-white h-screen w-screen overflow-auto">
            <NavBar username={user.username} noToken={noToken}/>
            <div className="flex h-[91%]">
            <MainSideBar />
            <div className="bg-[#191919] w-[80%]">
                existing rooms + create rooms
            </div>
        </div>
        </div>
    )
}




