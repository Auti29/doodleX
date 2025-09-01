"use client"

import { RefObject, useEffect, useRef } from "react";

export default function ZoomComponent({canvasRef}: {canvasRef: RefObject<HTMLCanvasElement | null>}) {
    const scaleRef = useRef(1);
    const spanRef = useRef<HTMLSpanElement | null>(null);
    
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

    const updateZoomDisplay = () => {
        if(spanRef.current){
            spanRef.current.textContent = `${Math.round(scaleRef.current*10)}%`
        }
    }
    

    const minScale = 1;
    const maxScale = 10;
    const zoomFactor = 1.1;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY < 0) {
        scaleRef.current *= zoomFactor;
      } else {
        scaleRef.current /= zoomFactor;
      }

      scaleRef.current = Math.min(
        Math.max(scaleRef.current, minScale),
        maxScale
      );
      updateZoomDisplay(); 
    };

    updateZoomDisplay();
    canvas.addEventListener("wheel", handleWheel);
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

    return (
        <div className="text-white  flex m-2 justify-between items-center border-l-2 border-gray-600 pl-2 pr-1">
            <div className="border border-gray-600 flex justify-center items-center ml-1.5 rounded-md p-2">
                <span ref={spanRef} className="flex-1/3 text-center font-sans"></span>
            </div>
        </div>
    )
}