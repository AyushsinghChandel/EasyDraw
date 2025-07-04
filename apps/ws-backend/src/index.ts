import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

const wss = new WebSocketServer({port:8080});
dotenv.config({path: "../../.env"});
const JWT_SECRET = process.env.JWT_SECRET as string;

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    }
    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get('token') || "";
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if(typeof  decoded == "string"){
        return;
    }

    if(!decoded || !decoded.userId){
        ws.close();
        return;
    }
    ws.on('message', function message(data){
        ws.send('pong');
    });
});