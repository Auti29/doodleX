import { Circle, PencilLineIcon, RectangleHorizontalIcon } from "lucide-react";
import IconBtn from "./IconBtn";
import { Dispatch, SetStateAction } from "react";
import { Tools } from "./Canvas";

export default function TopBar({selectedTool, setSelectedTool}: {selectedTool: string, setSelectedTool: Dispatch<SetStateAction<Tools>>}) {
    return ( 
        <div className="fixed text-white top-10 left-10 flex gap-1.5">
                <IconBtn 
                icon={<PencilLineIcon />}
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
            </div>
    )
}