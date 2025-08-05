"use client"

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId} : {roomId: string}){
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYWI5YTc3NC01NGJmLTQyYjYtYWU3OS0zNTc1YzU5NmM3NjEiLCJpYXQiOjE3NTQzODUzMzB9.MDr5pkFonDDTtRjvACPWBNNIdI-tOZrnMyfO1y4qMbQ`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    },[])


    if(!socket){
        return <div>
            connecting to server...
        </div>
    }

    return(
        <div>
            <Canvas roomId = {roomId} socket={socket}/>
        </div>
    )
}