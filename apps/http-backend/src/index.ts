import express from "express";
import cors from "cors";
import {authRegister} from "./auth/authRegister";
import { authSignin } from "./auth/authSignin";

const app = express();
app.use(express.json());
app.use(cors());
//add zod schema from @repo/types 
app.post("/api/v1/signup", authRegister);
app.post("/api/v1/signin", authSignin);
app.post("/api/v1/signup", (req, res) => {
    //middleware before this route
    //db call
    //create room
});

app.listen(3001);