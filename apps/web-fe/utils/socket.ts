const WS_URL: string = process.env.NEXT_PUBLIC_WS_URL!;


let socket: WebSocket | null = null;



export function getSocketConn(token: string){
    if(socket){
        return socket;
    }

    if(!token) return;
    

    socket = new WebSocket(`${WS_URL}?token=${token}`);

    return socket;
}