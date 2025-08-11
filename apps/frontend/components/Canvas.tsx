import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {Circle, Pencil, RectangleHorizontal} from "lucide-react"

type Shape = "circle" | "rect" | "pencil";
export function Canvas({
    roomId,
    socket
}:{
    roomId : string,
    socket : WebSocket
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool,setSelectedTool] = useState<Shape>("circle");
    useEffect(() => {
        //@ts-ignore
        window.selectedTool = selectedTool;
    },[selectedTool]);
    
    useEffect(() => {
        if(canvasRef.current){
            initDraw(canvasRef.current,roomId,socket);
        }
    },[canvasRef]);
    return (
        <div style={{
            height : "100vh",
            overflow: "hidden"
        }}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool}/>
        </div>
    )
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Shape
    setSelectedTool: (s: Shape) => void
}){
    return <div style={{
                position: "fixed",
                top: 10,
                left: 10
            }}>
                <div className="flex gap-5">
                    <IconButton icon={<Pencil />} onClick={()=> {
                        setSelectedTool("pencil")
                    }} activated={selectedTool === "pencil"}/>
                    <IconButton icon={<RectangleHorizontal />} onClick={()=> {
                        setSelectedTool("rect")
                    }} activated={selectedTool === "rect"} />
                    <IconButton icon={<Circle />} onClick={()=> {
                        setSelectedTool("circle")
                    }} activated={selectedTool === "circle"}/>
                </div>
            </div>
}