import {Request, Response} from "express";

export default function authRegister(req: Request, res: Response) {
    const {email, username, password} = req.body;
    
    if(!email || !password || !username) {
        return res.status(401).json({
            message: "credentials missing!!"
        });
    }

    //db call

    

} 