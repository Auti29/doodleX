"use client"

import drawShape from "@/draw";
import { useEffect, useRef } from "react"

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if(canvasRef.current){
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height =  window.innerHeight;
            drawShape(canvas);
        }
    }, [canvasRef]);

    return (
        <div className="overflow-hidden">
            <canvas ref={canvasRef} />
        </div>
    )
}