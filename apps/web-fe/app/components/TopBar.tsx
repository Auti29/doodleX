import { Circle,  EraserIcon, Minus, PencilLineIcon, PenIcon, RectangleHorizontalIcon } from "lucide-react";
import IconBtn from "./IconBtn";
import { Dispatch, SetStateAction } from "react";
import { Tools } from "./Canvas";

export default function TopBar({selectedTool, setSelectedTool}: {selectedTool: string, setSelectedTool: Dispatch<SetStateAction<Tools>>}) {
    return ( 
        <div className="cursor-pointer bg-slate-800 borde-0 fixed text-black top-5 flex w-fit gap-1.5 p-1 rounded-lg left-5 text-sm justify-center items-center">
                <IconBtn 
                icon={<Minus size={15}/>}
                activated={selectedTool === "Line"}
                onClick={() => setSelectedTool("Line")}
                />
                <IconBtn 
                icon={<RectangleHorizontalIcon size={15}/>}
                onClick={()=> setSelectedTool("Rect")}
                activated = {selectedTool === "Rect"}
                />
                <IconBtn 
                icon={<Circle size={15}/>}
                onClick={() => setSelectedTool("Circle")}
                activated = {selectedTool === "Circle"}
                />
                <IconBtn 
                icon={"A"}
                onClick={() => setSelectedTool("Text")}
                activated = {selectedTool === "Text"}
                />
                <IconBtn 
                icon={<PenIcon size={15}/>}
                onClick={() => setSelectedTool("Pencil")}
                activated = {selectedTool === "Pencil"}
                />
                <IconBtn 
                icon={<EraserIcon size={15}/>}
                onClick={() => setSelectedTool("Eraser")}
                activated = {selectedTool === "Eraser"}
                />
            </div>
    )
}