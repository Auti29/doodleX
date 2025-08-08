import { WebSocketServer } from "ws";



const wss = new WebSocketServer({port: 8080});

wss.on('connection', (socket, request) => {
    //get the jwt token from the url params and check if the user is signed in if yes only then allow to connect to ws 
    const url = request.url;
    if(!url) return;
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get('token'); //got the jwt 

    //decode the token and verify it with secretkey
    //db call to check the signedin status of user 
    //if the user is not signin in close the wss => socket.close();


    socket.on('message', () => {
        socket.send("pong");
    });
});