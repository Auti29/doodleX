export default function drawShape(canvas: HTMLCanvasElement) {
    const cxt = canvas.getContext("2d");

    if(!cxt) return;

    cxt.fillStyle = "rgba(0, 0, 0)";
    cxt.fillRect(0,0,canvas.width, canvas.height);

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
        console.log("x:" + startX + "   " + "y:" + startY);
    });

    canvas.addEventListener("mousemove", (e) => {
        if(clickedFlag){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            cxt.fillStyle = "rgba(0, 0, 0)";
            cxt.fillRect(0,0,canvas.width, canvas.height);
            cxt.strokeStyle = "rgba(255, 255, 255)"; 
            cxt.strokeRect(startX, startY, width, height);
        }
    })
}