import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
//add zod schema from @repo/types 
app.post("/api/v1/signup", (req, res) => {
    //get the credentials 
    //db call to check if the credentials are unique 
    //db call to create user
});
app.post("/api/v1/signin", (req, res) => {
    // authenticate credentials 
    //db call
    // generate token

});
app.post("/api/v1/signup", (req, res) => {
    //middleware before this route
    //db call
    //create room
});

app.listen(3001);