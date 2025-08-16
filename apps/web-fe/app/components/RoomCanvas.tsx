"use client"

import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL;


export default function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(WS_URL as string);
        ws.onopen = () => {
            setSocket(socket);
        }
    })


    if(!socket){
        return <div>Loading.....</div>
    }

    return (
        <Canvas roomId={roomId} socket={socket}/>
    )
}