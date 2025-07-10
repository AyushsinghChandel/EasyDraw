import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {JWT_SECRET} from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client";
const app = express();
app.use(express.json());

app.post("/signup", async (req,res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error);
        res.json({
            message : "Incorrect inputs"
        })
        return;
    }
    try{
        const user = await prismaClient.user.create({
        data:{
            email: parsedData.data?.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })
    res.json({
        userId : user.id
    })
    }catch(e){
        res.status(411).json({
            message: "User already exist with this email"
        })
    }
})

app.post("/signin", (req,res) => {
    
})

app.post("/room", middleware, (req,res) => {
    
})

app.listen(3001);