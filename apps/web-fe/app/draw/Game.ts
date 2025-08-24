import { getExistingShapes } from "./fetchData";
import { Tools } from "../components/Canvas";

type Shape = {
    type: "rect", 
    x: number, 
    y: number, 
    width: number, 
    height: number
} | 
{
    type: "circle", 
    centerX: number, 
    centerY: number, 
    radius: number
    
} | 
{
    type: "line",
    startX: number, 
    startY: number, 
    endX: number, 
    endY: number, 
} | {
    type: "pencil", 
    lines: {
    startX: number, 
    startY: number, 
    endX: number, 
    endY: number, 
    }[]
}

// type ShapeObj = {
//     id: string, 
//     shape: Shape
// }


export class Game {
    private canvas: HTMLCanvasElement;
    private cxt: CanvasRenderingContext2D;
    private chatId = null;
    private existingShapes: Shape[];
    private roomId: string;
    socket: WebSocket;
    private clickedFlag: boolean;
    private lines: {
        startX: number, 
        startY: number, 
        endX: number, 
        endY: number, 
    }[]  = [];
    private lineObj = {x:0 ,y:0};
    private eraserX = 0;
    private eraserY = 0;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tools = "Rect";

    private isSameShape(a: Shape, b: Shape): boolean {
    if(a.type !== b.type) return false;

    if(a.type === "rect" && b.type === "rect"){
        return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
    }
    if(a.type === "circle" && b.type === "circle"){
        return a.centerX === b.centerX && a.centerY === b.centerY && a.radius === b.radius;
    }
    if(a.type === "line" && b.type === "line"){
        return a.startX === b.startX && a.startY === b.startY && a.endX === b.endX && a.endY === b.endY;
    }
    if(a.type === "pencil" && b.type === "pencil"){
        return JSON.stringify(a.lines) === JSON.stringify(b.lines);
    }
    return false;
}



    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.cxt = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clickedFlag = false;
        this.init();
        this.initHandlers();
        this.mouseEventHandlers();
    }


    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }


    setTool(tool: Tools){
        this.selectedTool = tool;
    }

    async init () {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearAndPopulateCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);

        if(msg.type === "chat"){
            //todo: race cocndition  might happen fix later 
            const parsedMsg = JSON.parse(msg.message);
            this.existingShapes.push(parsedMsg.shape);
        }
        if(msg.type === "deleteChat"){
            const parsedMsg = JSON.parse(msg.message);
            this.existingShapes = this.existingShapes.filter(s => !this.isSameShape(s, parsedMsg.shape));
        }
        this.clearAndPopulateCanvas();
    }
    }

    clearAndPopulateCanvas(){
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cxt.fillStyle = "rgba(0, 0, 0)";
        this.cxt.fillRect(0,0,this.canvas.width, this.canvas.height);
        // this.cxt.lineWidth = 5;

        this.existingShapes.map((shape) => {
            if(shape && shape.type === "rect"){
                this.cxt.strokeStyle = "rgba(255, 255, 255)"; 
                this.cxt.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
            else if(shape && shape.type === "circle"){
                this.cxt.beginPath();
                this.cxt.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.cxt.stroke();
                this.cxt.closePath();
            }
            else if(shape && shape.type === "line"){
                this.cxt.beginPath();
                this.cxt.moveTo(shape.startX, shape.startY);
                this.cxt.lineTo(shape.endX, shape.endY);
                this.cxt.stroke();
                this.cxt.closePath();
            }
            else if(shape && shape.type === "pencil"){
                shape.lines.map(l => {
                this.cxt.beginPath();
                this.cxt.lineWidth = 1;
                this.cxt.lineCap = "round";
                this.cxt.moveTo(l.startX, l.startY);
                this.cxt.lineTo(l.endX, l.endY);
                this.cxt.stroke();
                this.cxt.closePath();
                });
            }
        })
        }
    

    mouseDownHandler = (e: MouseEvent) => {
        this.clickedFlag = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        if(this.selectedTool === "Pencil"){
            this.lineObj.x = e.clientX;
            this.lineObj.y = e.clientY;
        }
        else if(this.selectedTool === "Eraser"){
            this.eraserX = e.clientX;
            this.eraserY = e.clientY;
            this.eraseShape();
        }

    }


    mouseUpHandler = (e: MouseEvent) => {
        this.clickedFlag = false;
        const endX = e.clientX;
        const endY = e.clientY;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        let currShape: Shape | null = null;
        if(this.selectedTool === "Rect"){
            currShape = {
                type: "rect", 
                x: this.startX, 
                y: this.startY, 
                width, 
                height
            }
        }
        else if(this.selectedTool === "Circle"){
        const radius = Math.abs(Math.max(width, height) / 2);
        currShape = {
            type: "circle", 
            centerX: this.startX + radius, 
            centerY: this.startY + radius, 
            radius: radius
        }
        }
        else if(this.selectedTool === "Line"){
            currShape = {
                type: "line", 
                startX: this.startX, 
                startY: this.startY, 
                endX, 
                endY
            }
        }
        else if(this.selectedTool === "Pencil"){
            currShape = {
                type: "pencil", 
                lines: this.lines
            }
        }
    
        if(!currShape) return;
        this.existingShapes.push(currShape);    
        this.clearAndPopulateCanvas();
        
        this.socket.send(JSON.stringify({
            type: "chat", 
            roomId: this.roomId, 
            message: JSON.stringify({
                shape: currShape
            })
        }));    
    }

    mouseMoveHandler = (e: MouseEvent)  => {
        if(this.clickedFlag){
            this.clearAndPopulateCanvas();
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.cxt.strokeStyle = "rgba(255, 255, 255)";
            
            // @ts-ignore
            const selectedTool = this.selectedTool;
            if(selectedTool == "Rect"){
                this.cxt.strokeRect(this.startX, this.startY, width, height);
            }
            else if(selectedTool == "Circle"){
                const radius = Math.abs(Math.max(width, height)/2);
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.cxt.beginPath();
                this.cxt.arc(centerX, centerY, radius, 0, Math.PI * 2);
                this.cxt.stroke();
                this.cxt.closePath();
            }
            else if(selectedTool === "Line"){
                const endX = e.clientX;
                const endY = e.clientY;
                this.cxt.beginPath();
                this.cxt.moveTo(this.startX, this.startY);
                this.cxt.lineTo(endX, endY);
                this.cxt.stroke();
                this.cxt.closePath();
            }
            else if(selectedTool === "Pencil"){
                const startX = this.lineObj.x;
                const startY = this.lineObj.y;
                const endX = e.clientX;
                const endY = e.clientY;
                this.cxt.beginPath();
                this.cxt.lineWidth = 1;
                this.cxt.lineCap = "round";
                this.cxt.moveTo(this.lineObj.x, this.lineObj.y);
                this.lines.push({
                    startX, 
                    startY, 
                    endX, 
                    endY
                });
                this.lineObj.x = endX;
                this.lineObj.y = endY;
                this.cxt.lineTo(this.lineObj.x, this.lineObj.y);
                this.cxt.stroke();
                this.cxt.closePath();
            }
    }
    }

    mouseEventHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);

        this.canvas.addEventListener("mouseup", this.mouseUpHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }

    eraseShape = () => {
        let eraseFlag = false;
        let i;
        let shape: Shape;
        for(i = 0;i<this.existingShapes.length;i++){
           shape = this.existingShapes[i];
            if(shape && shape.type === "rect"){
                //top boundary 
                if(this.eraserY == shape.y && (this.eraserX >= shape.x && this.eraserX <= shape.x+shape.width)){
                    eraseFlag = true;
                    break;
                }
                //bottom boundary 
                if(this.eraserY == shape.y+shape.height && (this.eraserX >= shape.x && this.eraserX <= shape.x+shape.width)){
                    eraseFlag = true;
                    break;
                }
                //left boundary
                if(this.eraserX == shape.x && (this.eraserY >= shape.y && this.eraserY <= shape.y+shape.height)){
                    eraseFlag = true;
                    break;
                }
                //right boundary
                if(this.eraserX == shape.x+shape.width &&(this.eraserY >= shape.y && this.eraserY <= shape.y+shape.height)){
                    eraseFlag = true;
                    break;
                }
            }
        }
                if(eraseFlag){
            this.existingShapes = this.existingShapes.filter(s => s != shape);
            this.clearAndPopulateCanvas();
            this.socket.send(JSON.stringify({
            type: "deleteChat", 
            roomId: this.roomId, 
            message: JSON.stringify({
              shape: shape!  
            })
        }));
        this.clearAndPopulateCanvas();
        }
}
};