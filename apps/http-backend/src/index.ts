import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { middleware } from "./middleware";

dotenv.config({path:"../../.env"})
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.post("/signup", (req,res) => {

})

app.post("/signin", (req,res) => {
    
})

app.post("/room", middleware, (req,res) => {
    
})

app.listen(3002);