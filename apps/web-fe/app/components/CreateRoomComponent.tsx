"use client"

import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;

export default function CreateRoomComponent({setActiveCreateRoom}: {setActiveCreateRoom: Dispatch<SetStateAction<boolean>>}) {  
    // const [createClicked, setCreateClicked] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const [ roomDecription, setRoomDecription] = useState<string>("");
    const [error, setError]  = useState<boolean>(false);
    const router = useRouter();

    async function handleAddSpace() {
        if(roomName.length <= 4) {
            setError(true);
            return;
        }
        
        const token = localStorage.getItem('token');

        const res = await axios.post(`${BACKEND_API}/api/v1/createRoom`,  {
            room: roomName, 
            description: roomDecription
        }
        ,   
        {headers: {
        Authorization:`Bearer ${token}`
      }});

      const data = res.data;

      alert(data.message);

      setActiveCreateRoom(false);

      router.push(`/canvas/${data.roomId}`);
    }

    return (
        <div className="m-2 w-80 h-fit rounded-lg shadow-lg bg-[#121212] opacity-100 py-2 px-5">
            <div className="flex flex-col w-full">
                <div className="text-xl text-gray-300 mb-5 ml-1.5 font-bold" > 
                    Create New Space
                </div>
                        <div className="flex flex-col h-fit w-full">
                            <input 
                            onChange={(e) => {
                                setRoomName(e.target.value);
                                setError(false);
                            }}
                            value={roomName}
                            className={`w-full mr-1 p-2 font-bold border-2 ${error ?"border-red-500" :"border-gray-500"} rounded-lg`}
                             placeholder="Enter room name">
                             </input>
                            
                             {error && <div className="ml-1 text-red-500 text-sm font-bold">room name must have atleast 5 characters</div>}

                            <textarea 
                            className={`mt-3 mb-2 w-full min-h-30 max-h-40 mr-1 p-2 font-bold border-2  rounded-lg`}
                            placeholder="Enter room description"
                            onChange={(e) => {
                                setRoomDecription(e.target.value);
                            }}
                            value={roomDecription}
                            >
                            </textarea>
                            <button 
                            onClick={handleAddSpace}
                            className="w-full py-3 px-2 bg-blue-600 text-sm text-center text-white font-bold cursor-pointer hover:bg-blue-200 hover:text-black rounded-lg">Add Space</button>
                        </div>
                       
            </div>
        </div>
    )
}