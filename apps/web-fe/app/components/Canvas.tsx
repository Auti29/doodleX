"use client"

import { useEffect, useRef, useState } from "react";
import drawShape from "../draw";
import TopBar from "./TopBar";

export enum Tools {
    Line= "Line", 
    Circle="Circle", 
    Rect="Rect"
}

export default function Canvas({roomId, socket} : {
    roomId: string, 
    socket: WebSocket    
}) {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const [selectedTool, setSelectedTool] = useState<string>(Tools.Rect);

        useEffect(() => {
            // @ts-ignore
            window.selectedTool = selectedTool;
        }, [selectedTool]);


        useEffect(() => {
        if(canvasRef.current){
            const canvas = canvasRef.current;
            //this wont resize with the window use inbuilt react hook for that later 
            canvas.width = window.innerWidth;
            canvas.height =  window.innerHeight;
            drawShape(canvas, roomId, socket);
        }
    }, [canvasRef]);

    return(
        <>
        <div className="overflow-hidden h-[100vh]">
            <canvas ref={canvasRef} />
            <TopBar 
                selectedTool = {selectedTool}
                setSelectedTool = {setSelectedTool}
            />

        </div>
        </>
    )

}