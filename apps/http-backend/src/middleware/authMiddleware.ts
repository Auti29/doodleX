import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface authRequest extends Request {
    userId: string 
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.get('authorization');


    if(!authHeader) return res.status(403).json({
        message: "do sign in to access!!"
    });

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(403).json({
        message: "do sign in to access!!"
    });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY!) as JwtPayload;

    if(!decoded){
        return res.status(401).json({
            message: "wrong credentials"
        });
    }

    (req as authRequest).userId = decoded.id;

    next();

}