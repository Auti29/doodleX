import { Circle, Eraser, EraserIcon, PencilLineIcon, PenIcon, RectangleHorizontalIcon } from "lucide-react";
import IconBtn from "./IconBtn";
import { Dispatch, SetStateAction } from "react";
import { Tools } from "./Canvas";
import LineIcon from "./icons/LineIcon";

export default function TopBar({selectedTool, setSelectedTool}: {selectedTool: string, setSelectedTool: Dispatch<SetStateAction<Tools>>}) {
    return ( 
        <div className="border border-white fixed text-white top-5 flex w-fit gap-1.5 pt-2 pb-2 pl-3 pr-3 rounded-lg left-5">
                <IconBtn 
                icon={<LineIcon />}
                activated={selectedTool === "Line"}
                onClick={() => setSelectedTool("Line")}
                />
                <IconBtn 
                icon={<RectangleHorizontalIcon />}
                onClick={()=> setSelectedTool("Rect")}
                activated = {selectedTool === "Rect"}
                />
                <IconBtn 
                icon={<Circle />}
                onClick={() => setSelectedTool("Circle")}
                activated = {selectedTool === "Circle"}
                />
                <IconBtn 
                icon={"A"}
                onClick={() => setSelectedTool("Circle")}
                activated = {selectedTool === "Circle"}
                />
                <IconBtn 
                icon={<PenIcon />}
                onClick={() => setSelectedTool("Circle")}
                activated = {selectedTool === "Circle"}
                />
                <IconBtn 
                icon={<EraserIcon />}
                onClick={() => setSelectedTool("Circle")}
                activated = {selectedTool === "Circle"}
                />
            </div>
    )
}