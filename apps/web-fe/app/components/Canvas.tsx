"use client"

import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import { Game } from "../draw/Game";

export type Tools = "Circle" | "Rect" | "Line" | "Text" | "Eraser" | "Pensil";

export default function Canvas({roomId, socket} : {
    roomId: string, 
    socket: WebSocket    
}) {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const [game, setGame] = useState<Game>();
        const [selectedTool, setSelectedTool] = useState<Tools>("Rect");

        useEffect(() => {
            game?.setTool(selectedTool);
        }, [selectedTool]);


        useEffect(() => {
        if(canvasRef.current){
            const canvas = canvasRef.current;
            //this won't resize with the window use inbuilt react hook for that later 
            canvas.width = window.innerWidth;
            canvas.height =  window.innerHeight;
            const g = new Game(canvas, roomId, socket);
            setGame(g);     
            
            return () => {
                g.destroy();
            }
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