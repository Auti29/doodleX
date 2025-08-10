import { Request, Response } from "express";
import { SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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


        const isVerified = await bcrypt.compare(parsedData.data.password, findUser.password);
        if(!isVerified){
            return res.status(404).json({
                message: "wrong credentials!!!!"
            });
        }
        console.log("1");
        const token = jwt.sign({userId: findUser.id}, JWT_SECRET_KEY!);
        console.log("2");
    
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