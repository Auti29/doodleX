"use client"

import { useEffect, useState } from "react";
import CreateRoomComponent from "../components/CreateRoomComponent";
import NavBar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import axios from "axios";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;


export default function Dashboard() {
    const [user, setUser] = useState<{
        username: string,
        id: string, 
        email: string
    }>({
        username: "johndoe", 
        id: "123123", 
        email: "johndoe@hotmail.com"
    });
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function fetchUser() {
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
        <div className="h-[100vh] w-[100vw]">
            <div className="flex w-[100vw] justify-center mb-5">
            <NavBar username= {user?.username}/>
            </div>
                
            <div className="w-[95%] m-auto flex justify-between"> 
                <Sidebar user={user} />
                <CreateRoomComponent />
            </div>
        </div>
    )
}