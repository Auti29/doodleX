import {email, z} from "zod";


export const CreateUserSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.email(), 
    password: z.string().min(3),
    name: z.string().min(3)
});

export const SigninSchema = z.object({
    username: z.string().min(3).max(50), 
    password: z.string().min(3),
});

export const RoomSchema =  z.object({
    room: z.string().min(2), 

});