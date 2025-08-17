import axios from "axios";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;


export async function getExistingShapes(roomId:  string){
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