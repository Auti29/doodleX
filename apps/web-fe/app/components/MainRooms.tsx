"use client"

import { PlusCircleIcon } from "lucide-react";
import { Room } from "../dashboard/page";
import RoomComponent from "./RoomComponent";
import { Dispatch, SetStateAction } from "react";

export default function MainRooms ({user, setActiveCreateRoom}: {user: {
    username: string, 
    id: string , 
    email: string, 
    rooms: Room[]
}, setActiveCreateRoom: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className="m-2 w-full p-2 pl-3 pr-3">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-gray-400 ml-1.5 text-center">Existing Spaces</h2>
                <button 
                onClick={() => setActiveCreateRoom(true)}
                className=" bg-blue-600 text-white font-bold border-0 rounded-md pt-1 pb-1 pl-6 pr-6 cursor-pointer hover:bg-blue-200 hover:text-black "><span className="flex justify-center items-center"><PlusCircleIcon size={22} className="mr-2" /><span>Create new space</span></span></button>
            </div>
            <div className="mt-12 flex gap-3">
            {
                user.rooms.map((r) => {
                    return <RoomComponent key = {r.id} slug={r.slug} roomId={r.id} description={r.description || undefined}/>
                })
            }
            </div>
        </div>
    )
}