import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";
console.log(JWT_SECRET);
export function middleware(req:Request, res: Response, next:NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({
      message: "Authorization failed: Token not provided or malformed"
    });
    return;
  }
    const token = authHeader.split(' ')[1]??"";
    
    const decoded = jwt.verify(token, JWT_SECRET);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    }else{
        res.status(403).json({
            message: "Authorization failed"
        })
    }
}