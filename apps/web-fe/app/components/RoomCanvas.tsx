"use client"

import { useEffect, useState } from "react";
import Canvas from "./Canvas";
const WS_URL: string = process.env.NEXT_PUBLIC_WS_URL!;


export default function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc3MDliZi1jNTc5LTRkODAtOGU3Ny1mYTlmOWI3ZGQyOGUiLCJpYXQiOjE3NTUzNzk4ODl9.asLaE3_7E72nYu07hHtcj7uOO0A1hOzmtbIwCSCggwM`);
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room", 
                roomId
            }));
        }
    }, []);


    if(!socket){
        return <div>connecting to server.....</div>
    }

    return (
        <Canvas roomId={roomId} socket={socket}/>
    )
}