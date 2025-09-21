"use client"

import { PlusCircleIcon } from "lucide-react";
import RoomComponent from "./RoomComponent";
import { Dispatch, SetStateAction, useContext } from "react";
import { LayoutContext } from "../app/dashboard/layout";
import { CubeIcon } from "./icons/cube";

export default function MainRooms ({ setActiveCreateRoom}: {setActiveCreateRoom: Dispatch<SetStateAction<boolean>>}) {
    const user = useContext(LayoutContext).user;
    return (
        <div className="m-2 w-[100%] pt-4 pb-4 pl-8 pr-8">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-gray-400 ml-1.5 text-center">Existing Spaces</h2>

                <button 
                onClick={() => setActiveCreateRoom(true)}
                className=" bg-blue-600 text-white font-bold border-0 rounded-md pt-1 pb-1 pl-6 pr-6 cursor-pointer hover:bg-blue-200 hover:text-black "><span className="flex justify-center items-center"><PlusCircleIcon size={22} className="mr-2" /><span>Create new space</span></span></button>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
            {
                user.rooms.length > 0 ?
                user.rooms.map((r) => {
                    return <RoomComponent key = {r.id} slug={r.slug} roomId={r.id} description={r.description || undefined}/>
                })
                : 
                (
                    <div className="opacity-[60%] border hover:text-gray-300 border-gray-500 rounded-md m-auto flex flex-col justify-center items-center pt-5 pb-5 pl-8 pr-8 mt-10 text-gray-400">
                        <CubeIcon size={15}/>
                        <span className="text-3xl font-sans font-bold ">
                        No spaces found!
                        </span>
                    </div>
                )
            }
            </div>
        </div>
    )
}