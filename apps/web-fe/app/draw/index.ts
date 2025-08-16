import axios from "axios";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;


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

}



export default async function drawShape(canvas: HTMLCanvasElement, roomId: string, socket:WebSocket) {
    const cxt = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if(!cxt) return;

    clearAndPopulateCanvas(existingShapes, cxt, canvas);

    let clickedFlag = false;
    let startX = 0;
    let startY = 0;


    canvas.addEventListener("mousedown", (e) => {
        clickedFlag = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener("mouseup", (e) => {
        clickedFlag = false;
        // console.log("x:" + startX + "   " + "y:" + startY);
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        existingShapes.push({
            type: "rect", 
            x: startX, 
            y: startY, 
            width, 
            height
        });    
    });

    canvas.addEventListener("mousemove", (e) => {
        if(clickedFlag){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearAndPopulateCanvas(existingShapes, cxt, canvas);
            cxt.strokeStyle = "rgba(255, 255, 255)"; 
            cxt.strokeRect(startX, startY, width, height);
        }
    })
}


function clearAndPopulateCanvas(existingShapes: Shape[], cxt: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.fillStyle = "rgba(0, 0, 0)";
    cxt.fillRect(0,0,canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if(shape.type === "rect"){
            cxt.strokeStyle = "rgba(255, 255, 255)"; 
            cxt.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}


async function getExistingShapes(roomId:  string){
    const res = await axios.get(`${BACKEND_API}/api/v1/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((m: string) => {
        const parsedMessage = JSON.parse(m);
        return parsedMessage;
    });

    return shapes;
}