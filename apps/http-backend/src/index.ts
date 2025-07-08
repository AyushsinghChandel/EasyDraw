import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import {JWT_SECRET} from "@repo/backend-common/config";
const app = express();
app.use(express.json());

app.post("/signup", (req,res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        })
        return;
    }
})

app.post("/signin", (req,res) => {
    
})

app.post("/room", middleware, (req,res) => {
    
})

app.listen(3002);