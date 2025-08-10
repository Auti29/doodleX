import { RawData, WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prismaClient } from "@repo/db/client";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const wss = new WebSocketServer({port: 8080});

interface UserI {
    ws: WebSocket, 
    userId: string, 
    rooms: string[]
}


//todo: add a singleton for state management
const users: UserI[] = [];

const checkUser: (arg: string) => string | null = (token: string) =>  {
    try{
        const decoded = jwt.verify(token, JWT_SECRET_KEY!) as JwtPayload;
    
        if(typeof (decoded) == "string") {
            return null;
        }
        if(!decoded || !decoded.userId){
            return null;
        }
        return decoded.userId;
    }catch(e){
        console.log("token error: user token is wrong!!!: ", e);
        return null;
    }

    }

wss.on('connection', (socket, request) => {
    const url = request.url;
    if(!url) return;
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token'); 
    if(!token){
        socket.close();
        return;
    } 
    const userId: string | null = checkUser(token);

    if(!userId){
        socket.close();
        return;
    }

    users.push({
        userId, 
        ws:socket, 
        rooms: []
    });

    socket.on('message', async (data) => {
        const parsedData = JSON.parse(data as unknown as string); 
        if(parsedData.type === "join_room"){
            const currUser = users.find(u => u.ws == socket);
            currUser?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === "leave_room"){
            const currUser = users.find(u => u.ws == socket);
            if(!currUser) return;
            currUser.rooms = currUser?.rooms.filter(r => r !== parsedData.roomId);
        }

        if(parsedData.type === "chat"){
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            //todo: put db call in queue pipeline later
            await prismaClient.chat.create({
                data: {
                    roomId, 
                    message, 
                    userId
                }
            })

            users.forEach(user => {
                if(user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat", 
                        message, 
                        roomId
                    }));
                }
            });
        }
    }); 

});



//usersSchema 
// users = [
//     {
//         userId: 1,
//         rooms: [room1, room2],
//         ws: socket1//current socket of the user 
//     }, 
//     {
//         userId: 2,
//         rooms: [room2],
//         ws: socket2//current socket of the user 
//     }
// ]

//message/room schema
//join message
// {
//     type: join_room, 
//     roomId: "abc123"
// }
//leave room 
// {
//     type: leave_room, 
//     roomId: "abc123"
// }
//chat message 
// {
//     type: chat, 
//     roomId: "abc123", 
//      message: "ping pong"
// }