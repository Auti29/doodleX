import { Request, Response } from "express";
import { SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export async function authSignin(req: Request, res: Response) {
    try{

        const parsedData = SigninSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(404).json({
                message: "Invalid credentials!!"
            });
        }
    
        const findUser = await prismaClient.user.findFirst({
            where: {
                username: parsedData.data.username
            }
        });
    
        if(!findUser){
            return res.status(404).json({
                message: "accout missing, sign up to create an account!!"
            });
        }
    
        const token = jwt.sign(findUser.id, JWT_SECRET!);
    
        return res.status(200).json({
            message: "singin done!!", 
            token
        });
    }catch(err){
        console.log("error: ", err);
        return res.status(500).json({
            message: "internal server error" + err
        });
    }
}