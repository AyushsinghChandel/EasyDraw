import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {JWT_SECRET} from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client";
import bcrypt from "bcrypt";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

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
        const password = parsedData.data.password;
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await prismaClient.user.create({
        data:{
            email: parsedData.data?.username,
            password: hashedPassword,
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

app.post("/signin", async (req,res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.error);
        res.json({
            mesaage: "Incorrect Inputs"
        })
        return;
    }
    try{
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username
            }
        })
        if(!user){
            res.status(403).json({
                message : "this email doesn't exist"
            })
            return;
        }
        const passwordMatch = bcrypt.compare(parsedData.data.password,user.password);
        if(!passwordMatch){
            res.status(403).json({
                message: "Authorization failed"
            })
            return;
        }
        const token = jwt.sign({
            userId: user.id
        },JWT_SECRET);

        res.json({
            token
        })

    }catch(e){
        res.status(411).json({
            message: "Unexpected error happended try after sometime"
        });
    }
})

app.post("/room", middleware, async (req,res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Inccorect Input"
        })
        return;
    }
    try{
        //@ts-ignore
    const userId = req.userId;

    const room =  await prismaClient.room.create({
        data: {
            slug: parsedData.data.name,
            adminId: userId
        }
    })
    res.json({
        roomId : room.id
    })
    }catch(e){
        res.status(411).json({
            message: "room already exist with this name"
        })
    }
})

app.get("/chats/:roomId", async (req,res) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    });
    res.json({
        messages
    })
})

app.get("/room/:slug", async (req,res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });
    res.json({
        room
    })
})

app.listen(3002);