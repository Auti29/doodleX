"use client"

import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

export default function CreateRoomComponent() {
    const [createClicked, setCreateClicked] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const [error, setError]  = useState<boolean>(false);
    const router = useRouter();

    async function handleAddSpace() {
        if(roomName.length <= 4) {
            setError(true);
            return;
        }
    
        const token = localStorage.getItem('token');

        const res = await axios.post(`${BACKEND_API}/api/v1/createRoom`,  {
            room: roomName}
        ,   
        {headers: {
        Authorization: token ?`Bearer ${token}` : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc3MDliZi1jNTc5LTRkODAtOGU3Ny1mYTlmOWI3ZGQyOGUiLCJpYXQiOjE3NTUzNzk4ODl9.asLaE3_7E72nYu07hHtcj7uOO0A1hOzmtbIwCSCggwM",  
      }});

      const data = res.data;

      alert(data.message);

      router.push(`/canvas/${data.roomId}`);
    }

    return (
        <div className="border-3 border-gray-200 m-2 w-[48%] p-2 rounded-lg shadow-lg h-fit">
            <h1 className="font-bold text-lg text-gray-500 mb-5 ml-1.5">Create Space</h1>
            <div className="w-full flex items-center justify-center">
                <div className="w-[85%] flex justify-center items-center bg-gray-200 border-0 rounded-lg p-5 mb-3">
                    {   createClicked ? 
                        <div className="flex flex-col w-full">
                        <div className="flex h-fit w-full">
                            <input 
                            onChange={(e) => {
                                setRoomName(e.target.value);
                                setError(false);
                            }}
                            value={roomName}
                            className={`flex-3/4 w-full mr-1 p-2 font-bold border-2 ${error ?"border-red-500" :"border-gray-500"} rounded-lg`}
                             placeholder="Enter custom space name"></input>
                            <button 
                            onClick={handleAddSpace}
                            className="flex-1/4 bg-blue-600 pt-1 pb-1 pl-4 pr-4 font-bold text-white cursor-pointer hover:bg-blue-200 hover:text-black rounded-lg">
                            Add Space</button>
                        </div>
                        {error && <div className="ml-1 text-red-500 text-sm font-bold">room name must have atleast 5 characters</div>}
                        </div>
                        :
                        <button 
                        onClick={() => setCreateClicked(true)}
                        className="bg-blue-600 pt-2 pb-2 pl-4 pr-4 font-bold text-white cursor-pointer hover:bg-blue-200 hover:text-black rounded-lg">
                       <span className="flex pl-2 pr-2"><p className="mr-2"> New Collaborative Space</p> <PlusCircleIcon /> </span></button>
                    }
                </div>
            </div>
        </div>
    )
}