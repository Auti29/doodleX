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
                main content
            </div>
        </div>
        </div>
    )
}




// return (
//     <>
//     <div className="h-[100vh] w-[100vw]">
//         <div className="flex w-[100vw] justify-center mb-5">
//         <NavBar username= {user?.username} noToken = {noToken}/>
//         </div>
//        {   
//        noToken ?
//         <div className="p-5 w-fit h-fit m-auto flex justify-center  items-center flex-col border-3 border-gray-200 shadow-xl rounded-lg">
//             <h2 className="text-lg font-bold font-mono m-3">Login/Register to access Dashboard!!!</h2>
//             <div className="w-[60%] flex justify-between">
//                 <Link href={'/signin'}>
//                 <button className="bg-gray-600 text-white font-bold border-2 border-blue-600 rounded-md pt-1 pb-1 pl-6 pr-6 cursor-pointer hover:bg-blue-200 hover:text-black">Signin</button>
//                 </Link>
//                 <Link href={'/signup'}>
//                 <button className="bg-blue-600 text-white font-bold border-0 rounded-md pt-1 pb-1 pl-6 pr-6 cursor-pointer hover:bg-blue-200 hover:text-black hover:border-2 hover:border-blue-600">Register</button>
//                 </Link>
//             </div>
//         </div>
//        :  
//         <div className="w-[95%] m-auto flex justify-between"> 
//             <Sidebar user={user} />
//             <CreateRoomComponent />
//         </div>}
//     </div>
//     </>
// )