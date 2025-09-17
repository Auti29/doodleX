"use client"

import { useContext, useState } from "react";
import CreateRoomComponent from "../components/CreateRoomComponent";
import MainRooms from "../components/MainRooms";
import MainSideBar from "../components/MainSideBar";
import { LayoutContext } from "./layout";

export interface Room {
    id: number, 
    slug: string, 
    description?: string,
    adminId: string, 
    createdAt: Date
}


export default function Dashboard() {
    const [activeCreateRoom, setActiveCreateRoom] = useState<boolean>(false);
    return (
        <div className="h-full w-full flex overflow-hidden text-white">
            <MainSideBar />
            <div className="bg-[#191919] flex-1 h-full relative">
                {activeCreateRoom && (
                    <>
                        <div
                          onClick={() => setActiveCreateRoom(false)}
                          className="fixed inset-0 bg-gray-300 opacity-50"
                        />
                        <div className="z-50 fixed top-[30%] left-[50%]">
                            <CreateRoomComponent setActiveCreateRoom={setActiveCreateRoom} />
                        </div>
                    </>
                )}
                <MainRooms setActiveCreateRoom={setActiveCreateRoom}/>
            </div>
        </div>
    )
}
// 
// // return (
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



