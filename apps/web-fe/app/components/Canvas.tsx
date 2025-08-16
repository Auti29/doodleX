"use client"

import { useEffect, useRef } from "react";
import drawShape from "../draw";


export default function Canvas({roomId, socket} : {
    roomId: string, 
    socket: WebSocket    
}) {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
        useEffect(() => {
        if(canvasRef.current){
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height =  window.innerHeight;
            drawShape(canvas, roomId, socket);
        }
    }, [canvasRef]);

    return(
        <div className="overflow-hidden">
            <canvas ref={canvasRef} />
        </div>
    )

}