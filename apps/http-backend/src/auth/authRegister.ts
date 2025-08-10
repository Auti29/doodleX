import {Request, Response} from "express";
import {CreateUserSchema} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";

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
        
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 8);
        parsedData.data.password = hashedPassword;

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