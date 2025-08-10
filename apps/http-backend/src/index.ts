import express from "express";
import cors from "cors";
import {authRegister} from "./auth/authRegister";
import { authSignin } from "./auth/authSignin";
import { authMiddleware, authRequest } from "./middleware/authMiddleware";
import { RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());
app.use(cors());
//add zod schema from @repo/types 
app.post("/api/v1/signup", authRegister);
app.post("/api/v1/signin", authSignin);
app.post("/api/v1/createRoom", authMiddleware, async (req, res) => {
    try{

        const parsedData = RoomSchema.safeParse(req.body);
         if(!parsedData){
             return res.status(411).json({
                 message: 'incorrect format!!'
             });
         }
     
         const userId = (req as authRequest).userId;
         
         const roomExists  = await prismaClient.room.findFirst({
             where: {
                 slug: parsedData.data?.room
             }
         })
     
         if(roomExists){
             return res.status(411).json({
                 message: "room with this slug already exists try different slug!!"
             });
         }
     
         const room = await prismaClient.room.create({
             data: {
                 slug: parsedData.data!.room, 
                 adminId: userId
             }
         });
     
         return res.status(200).json({
             message: "room created successfully!!", 
             roomId: room.id
         });
    }catch(e){
        console.log("error occured: ", e);
        return res.status(500).json({
            message: "internal server error!!"
        }); 
    }
});

app.get('/api/v1/chats/:roomId', authMiddleware,  async (req, res) => {
  const roomId = Number(req.params.roomId);
 try { 
  const messages = await prismaClient.chat.findMany({
    where: {
        roomId
    }, 
    orderBy: {
        id: "desc"
    },
    take: 50
  });

  return res.status(200).json({
    message: "success", 
    messages
  });
} catch(e){
    console.log("error occurred: ", e);
    return res.status(500).json({
        message: "internal server error!!"
    });
}

});


app.get('/api/v1/room/slug', authMiddleware,  async (req, res) => {
  const slug = req.params.slug;
 try { 
  const room = await prismaClient.room.findFirst({
    where: {
        slug
    }
  });

  return res.status(200).json({
    message: "success", 
    room
    
  });
} catch(e){
    console.log("error occurred: ", e);
    return res.status(500).json({
        message: "internal server error!!"
    });
}

});



app.listen(3001);