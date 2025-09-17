"use client"

import { useState } from "react";
import CreateRoomComponent from "../components/CreateRoomComponent";
import MainRooms from "../components/MainRooms";
import MainSideBar from "../components/MainSideBar";

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
