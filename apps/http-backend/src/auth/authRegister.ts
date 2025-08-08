import {Request, Response} from "express";
import {JWT_SECRET} from "@repo/backend-common/config";
import {CreateUserSchema} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export async function authRegister(req: Request, res: Response) {
    try{
        const parsedData = CreateUserSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            return res.status(404).json({
                message: "credentials missing!!"
            });
        }
       
        const findUser = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        });

        if(findUser){
            return res.status(411).json({
                message: "user already exists with this email!!"
            });
        }
    
        await prismaClient.user.create({
            data: parsedData.data
        });
    
        return res.status(200).json({
            message: "signup successful"
        });
    }catch(e){
        console.log("error occured: ", e);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

} 