import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const wss = new WebSocketServer({port: 8080});

const checkUser: (arg: string) => string | null = (token: string) =>  {
    const decoded = jwt.verify(token, JWT_SECRET_KEY!) as JwtPayload;

    if(typeof (decoded) == "string") {
        return null;
    }
    if(!decoded || !decoded.userId){
        return null;
    }
    return decoded.userId;
}

wss.on('connection', (socket, request) => {
    const url = request.url;
    if(!url) return;
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token'); 
    if(!token){
        wss.close();
        return;
    } 
    const authenticatedUser: string | null = checkUser(token);


    socket.on('message', () => {
        socket.send("pong");
    });
});