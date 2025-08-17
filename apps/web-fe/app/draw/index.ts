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

    //todo: put this in a global state store (zustand/recoil) or use singleton
    let existingShapes: Shape[] = await getExistingShapes(roomId);
    if(!cxt) return; 

    clearAndPopulateCanvas(existingShapes, cxt, canvas);
    //put shape to ws server
    socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);

        if(msg.type === "chat"){
            //todo: race cocndition  might happen fix later 
            const parsedMsg = JSON.parse(msg.message);
            existingShapes.push(parsedMsg.shape);
            clearAndPopulateCanvas(existingShapes, cxt, canvas);
        }
    }

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
        let currShape: Shape | null = null;
        // @ts-ignore
        const selectedTool = window.selectedTool;
        
    if(selectedTool === "Rect"){
            currShape = {
                type: "rect", 
                x: startX, 
                y: startY, 
                width, 
                height
            }
    }
    else if(selectedTool === "Circle"){
        const radius = Math.abs(Math.max(width, height) / 2);
        currShape = {
            type: "circle", 
            centerX: startX + radius, 
            centerY: startY + radius, 
            radius: radius
        }
        
    }
    
    if(!currShape) return;
    existingShapes.push(currShape);    
    clearAndPopulateCanvas(existingShapes, cxt, canvas);
    
    socket.send(JSON.stringify({
        type: "chat", 
        roomId, 
        message: JSON.stringify({
            shape: currShape
        })
    }));
    clearAndPopulateCanvas(existingShapes, cxt, canvas);
});

canvas.addEventListener("mousemove", (e) => {
    if(clickedFlag){
        clearAndPopulateCanvas(existingShapes, cxt, canvas);
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        cxt.strokeStyle = "rgba(255, 255, 255)";
        
        // @ts-ignore
        const selectedTool = window.selectedTool;
        if(selectedTool == "Rect"){
            cxt.strokeRect(startX, startY, width, height);
        }
        else if(selectedTool == "Circle"){
            const radius = Math.abs(Math.max(width, height)/2);
            const centerX = startX + radius;
            const centerY = startY + radius;
            cxt.beginPath();
            cxt.arc(centerX, centerY, radius, 0, Math.PI * 2);
            cxt.stroke();
            cxt.closePath();
        }
    }
})
}


function clearAndPopulateCanvas(existingShapes: Shape[], cxt: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.fillStyle = "rgba(0, 0, 0)";
    cxt.fillRect(0,0,canvas.width, canvas.height);
    // @ts-ignore
    const selectedTool = window.selectedTool;
    
    existingShapes.map((shape) => {
        if(shape.type === "rect"){
            cxt.strokeStyle = "rgba(255, 255, 255)"; 
            cxt.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        else if(shape.type === "circle"){
            cxt.beginPath();
            cxt.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            cxt.stroke();
            cxt.closePath();
            
        }
    })
}


async function getExistingShapes(roomId:  string){
    const token = localStorage.getItem('token');
    const res = await axios.get(`${BACKEND_API}/api/v1/chats/${roomId}`, {
        headers: {
        Authorization: token ?`Bearer ${token}` : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc3MDliZi1jNTc5LTRkODAtOGU3Ny1mYTlmOWI3ZGQyOGUiLCJpYXQiOjE3NTUzNzk4ODl9.asLaE3_7E72nYu07hHtcj7uOO0A1hOzmtbIwCSCggwM",  
      },

    });
    const messages = res.data.messages;
    const shapes = messages.map((m: any) => {
        const parsedMessage = JSON.parse(m.message);
        return parsedMessage.shape;
    });

    return shapes;
}