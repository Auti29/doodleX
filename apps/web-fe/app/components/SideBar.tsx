"use client"

import { Room } from "../dashboard/page";
import RoomComponent from "./RoomComponent";

export default function Sidebar ({user}: {user: {
    username: string, 
    id: string , 
    email: string, 
    rooms: Room[]
}}) {

    return (
        <div className="border-3 border-gray-200 m-2 w-[48%] p-2 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg text-gray-500 mb-3 ml-1.5">Existing Spaces</h2>
            <div>
            {
                user.rooms.map((r) => {
                    return <RoomComponent key = {r.id} slug={r.slug} roomId={r.id}/>
                })
            }
            </div>
        </div>
    )
}