"use client"

import { useEffect, useState } from "react";
import Canvas from "./Canvas";
const WS_URL: string = process.env.NEXT_PUBLIC_WS_URL!;


export default function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    
    //put token fetching functionality

    useEffect(() => {
        let token: string = "";
        if(localStorage.getItem('token') == undefined){
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc3MDliZi1jNTc5LTRkODAtOGU3Ny1mYTlmOWI3ZGQyOGUiLCJpYXQiOjE3NTUzNzk4ODl9.asLaE3_7E72nYu07hHtcj7uOO0A1hOzmtbIwCSCggwM";
        }
        else {
            token = localStorage.getItem('token') as string;
        }
        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room", 
                roomId
            }));
        }
    }, []);


    if(!socket){
        return <div className="w-[100vw] h-[100vh] bg-black flex justify-center items-center text-xl text-white font-bold font-mono cursor-wait">
            <span>connecting to server.....</span>
            </div>
    }

    return (
        <Canvas roomId={roomId} socket={socket}/>
    )
}