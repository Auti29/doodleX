import { getExistingShapes } from "./fetchData";
import { Tools } from "../components/Canvas";

type Rect =  {
    type: "rect", 
    x: number, 
    y: number, 
    width: number, 
    height: number
}

type Cir ={
    type: "circle", 
    x: number, 
    y: number, 
    radiusX: number, 
    radiusY: number, 
    rotation: number, 
    startAngle: number, 
    endAngle: number
}

type Li = {
    type: "line",
    startX: number, 
    startY: number, 
    endX: number, 
    endY: number, 
}

type Shape = Rect | 
Cir | 
Li | {
    type: "pencil", 
    lines: {
    startX: number, 
    startY: number, 
    endX: number, 
    endY: number, 
    }[]
};

// type ShapeObj = {
//     id: string, 
//     shape: Shape
// }


export class Game {
    private currShape: Shape | null = null; 
    private canvas: HTMLCanvasElement;
    private cxt: CanvasRenderingContext2D;
    private chatId = null;
    private existingShapes: Shape[];
    private  scale = 1.0;
    private offsetX = 0;
    private offsetY = 0;
    private roomId: string;
    socket: WebSocket;
    private minScale: number;
    private maxScale: number = 10; 
    private clickedFlag: boolean;
    private lines:{
        startX: number, 
        startY: number, 
        endX: number, 
        endY: number, 
    }[] = [];
    private lineObj = {x:0 ,y:0};
    private eraserX = 0;
    private eraserY = 0;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tools = "Rect";
    private worldWidth;
    private worldHeight;



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
          this.worldWidth = canvas.width;
  this.worldHeight = canvas.height;

        this.minScale = Math.min(
            canvas.width / canvas.width,  
            canvas.height / canvas.height 
        );
    }

    private isSameShape(a: Shape, b: Shape): boolean {
    if(a.type !== b.type) return false;

    if(a.type === "rect" && b.type === "rect"){
        return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
    }
    if(a.type === "circle" && b.type === "circle"){
        return a.x === b.x && a.y === b.y && a.radiusX === b.radiusX && a.radiusY === b.radiusY && a.startAngle === b.startAngle && a.endAngle === b.endAngle && a.rotation === b.rotation;
    }
    if(a.type === "line" && b.type === "line"){
        return a.startX === b.startX && a.startY === b.startY && a.endX === b.endX && a.endY === b.endY;
    }
    if(a.type === "pencil" && b.type === "pencil"){
        return JSON.stringify(a.lines) === JSON.stringify(b.lines);
    }
    return false;
}

    private isPointNearLine() {
    if(!this.currShape) return;
    if(this.currShape.type !== "line") return;
    
    const tolerance = 3;
    const x1 = this.currShape.startX;
    const x2 = this.currShape.endX;
    const y1 = this.currShape.startY;
    const y2 = this.currShape.endY;
    const px = this.eraserX;
    const py = this.eraserY;

    // distance from point to line
    const numerator = Math.abs((y2 - y1) * px - (x2 - x1) * py + x2 * y1 - y2 * x1);
    const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    const distance = numerator / denominator;

    // check bounding box
    const withinX = px >= Math.min(x1, x2) - tolerance && px <= Math.max(x1, x2) + tolerance;
    const withinY = py >= Math.min(y1, y2) - tolerance && py <= Math.max(y1, y2) + tolerance;

    return distance <= tolerance && withinX && withinY;
}


    private isPointOnEllipseEdge(cx: number, cy: number, rx: number, ry: number, px: number, py: number, tolerance: number) {
    //normalization
        const value =((px - cx) ** 2) / (rx ** 2) + ((py - cy) ** 2) / (ry ** 2);
        return value >= (1 - tolerance) && value <= (1 + tolerance);
    }


    private screenToWorld(x: number, y:number) {
        return {
            x: (x - this.offsetX) / this.scale,
            y: (y - this.offsetY) / this.scale
        };
}

    


    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);

        this.canvas.removeEventListener("wheel", this.handleZoom);
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
        
      this.cxt.setTransform(1, 0, 0, 1, 0, 0); // reset

      this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cxt.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);
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
                this.cxt.ellipse(shape.x,  shape.y, shape.radiusX, shape.radiusY, shape.rotation, shape.startAngle, shape.endAngle);
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

        const worldPos = this.screenToWorld(e.offsetX, e.offsetY);
        this.clickedFlag = true;
        this.startX = worldPos.x;
        this.startY = worldPos.y;
        // this.startX = e.clientX;
        // this.startY = e.clientY;
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
        const worldPos = this.screenToWorld(e.offsetX, e.offsetY);
        this.clickedFlag = false;
        // const endX = e.clientX;
        // const endY = e.clientY;
        const endX = worldPos.x;
        const endY = worldPos.y;
        const width = worldPos.x - this.startX;
        const height = worldPos.y - this.startY;
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
        const radiusX = Math.abs(width / 2);
        const radiusY = Math.abs(height / 2);
        currShape = {
            type: "circle", 
            x: this.startX+radiusX,
            y:this.startY+radiusY, 
            radiusX,  
            radiusY, 
            rotation: Math.PI, 
            startAngle: 0, 
            endAngle: 2*Math.PI, 
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
        const worldPos = this.screenToWorld(e.offsetX, e.offsetY);
        if(this.clickedFlag){
            this.clearAndPopulateCanvas();
            const width = worldPos.x - this.startX;
            const height = worldPos.y - this.startY;
            this.cxt.strokeStyle = "rgba(255, 255, 255)";
            
            // @ts-ignore
            const selectedTool = this.selectedTool;
            if(selectedTool == "Rect"){
                this.cxt.strokeRect(this.startX, this.startY, width, height);
            }
            else if(selectedTool == "Circle"){
                const radiusX = Math.abs(width / 2);
                const radiusY = Math.abs(height / 2);
                const x = this.startX + radiusX;
                const y = this.startY + radiusY;
                this.cxt.beginPath();
                this.cxt.ellipse(x,  y, radiusX, radiusY, 0, 0, 2 * Math.PI);
                this.cxt.stroke();
                this.cxt.closePath();
            }
            else if(selectedTool === "Line"){
                const endX = worldPos.x;
                const endY = worldPos.y;
                this.cxt.beginPath();
                this.cxt.moveTo(this.startX, this.startY);
                this.cxt.lineTo(endX, endY);
                this.cxt.stroke();
                this.cxt.closePath();
            }
            else if(selectedTool === "Pencil"){
                const startX = this.lineObj.x;
                const startY = this.lineObj.y;
                const endX = worldPos.x;
                const endY = worldPos.y;
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

 


handleZoom = (e: WheelEvent) => {
  e.preventDefault();

  const zoomFactor = 1.1;

  const mouseWorld = this.screenToWorld(e.offsetX, e.offsetY);

  if (e.deltaY < 0) {
    this.scale *= zoomFactor;
  } else {
    this.scale /= zoomFactor;
  }

  this.scale = Math.min(Math.max(this.scale, this.minScale), this.maxScale);

  this.offsetX = e.offsetX - mouseWorld.x * this.scale;
  this.offsetY = e.offsetY - mouseWorld.y * this.scale;

  const worldWidth = this.worldWidth * this.scale;
  const worldHeight = this.worldHeight * this.scale;

  this.offsetX = Math.min(0, Math.max(this.offsetX, this.canvas.width - worldWidth));
  this.offsetY = Math.min(0, Math.max(this.offsetY, this.canvas.height - worldHeight));

  this.clearAndPopulateCanvas();
};


    mouseEventHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);

        this.canvas.addEventListener("mouseup", this.mouseUpHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);

        this.canvas.addEventListener("wheel", this.handleZoom);
    }

    eraseShape = () => {
        let eraseFlag = false;
        let i;
        const tolerance = 3;
        for(i = 0;i<this.existingShapes.length;i++){
           this.currShape = this.existingShapes[i];
            if(this.currShape && this.currShape.type === "rect"){
                //top boundary 
                if((Math.abs(this.eraserY - this.currShape.y) <= tolerance) && (this.eraserX >= this.currShape.x && this.eraserX <= this.currShape.x+this.currShape.width)){
                    eraseFlag = true;
                    break;
                }
                //bottom boundary 
                if((Math.abs(this.eraserY - (this.currShape.y+this.currShape.height)) <= tolerance) && (this.eraserX >= this.currShape.x && this.eraserX <= this.currShape.x+this.currShape.width)){
                    eraseFlag = true;
                    break;
                }
                //left boundary
                if((Math.abs(this.eraserX - this.currShape.x) <= tolerance) && (this.eraserY >= this.currShape.y && this.eraserY <= this.currShape.y+this.currShape.height)){
                    eraseFlag = true;
                    break;
                }
                //right boundary
                if((Math.abs(this.eraserX - (this.currShape.x+this.currShape.width)) <= tolerance) &&(this.eraserY >= this.currShape.y && this.eraserY <= this.currShape.y+this.currShape.height)){
                    eraseFlag = true;
                    break;
                }
            }
            else if(this.currShape && this.currShape.type === "circle"){
                if( this.isPointOnEllipseEdge(this.currShape.x, this.currShape.y, this.currShape.radiusX, this.currShape.radiusY, this.eraserX, this.eraserY, 2)){
                    eraseFlag = true;
                    break;
                }

            }
            else if((this.currShape && this.currShape.type === "line") && this.isPointNearLine()){                
                    eraseFlag = true;
                    break;

            }
            else if(this.currShape && this.currShape.type === "pencil"){
                let j = 0;
                let nearFlag = false;
                for(;j<this.currShape.lines.length;j++){
                    const x1 = this.currShape.lines[j].startX;
                    const x2 = this.currShape.lines[j].endX;
                    const y1 = this.currShape.lines[j].startY;
                    const y2 = this.currShape.lines[j].endY;

                    const px = this.eraserX;
                    const py = this.eraserY;

                    const numerator = Math.abs((y2 - y1) * px - (x2 - x1) * py + x2 * y1 - y2 * x1);
                    const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
                    const distance = numerator / denominator;
                    const withinX = px >= Math.min(x1, x2) - tolerance && px <= Math.max(x1, x2) + tolerance;
                    const withinY = py >= Math.min(y1, y2) - tolerance && py <= Math.max(y1, y2) + tolerance;

                    if(distance <= tolerance && withinX && withinY){
                        nearFlag = true;
                        break;
                    }
                }
                if(nearFlag) {
                    eraseFlag = true;
                    break;
                }  
            }
        }

        if(eraseFlag){
            this.existingShapes = this.existingShapes.filter(s => s != this.currShape);
            this.clearAndPopulateCanvas();
            this.socket.send(JSON.stringify({
            type: "deleteChat", 
            roomId: this.roomId, 
            message: JSON.stringify({
              shape: this.currShape!  
            })
        }));
        this.clearAndPopulateCanvas();
    }
    this.clearAndPopulateCanvas();
}
};
