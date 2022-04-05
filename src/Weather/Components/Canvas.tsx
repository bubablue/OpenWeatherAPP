import React, { useEffect, useRef } from "react";
import "../../App.css";
import { useWeather } from "../Hooks/useWeather";
import * as timers from "./main"

const Canvas: React.FC<{}> = () => {

    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    let { UpdateInfo } = useWeather();

    useEffect(() => {

        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;

            let center_x = ctx!.canvas.width / 2;
            let center_y = ctx!.canvas.height / 2;
            let rad = Math.PI * 2 / 100;
            let progress = 0.1;

            window.devicePixelRatio = 2;

            var displaySize_x = 300;
            var displaySize_y = 170;

            ctx!.canvas.style.width = displaySize_x + "px";
            ctx!.canvas.style.height = displaySize_y + "px";

            var scale = window.devicePixelRatio;

            ctx!.canvas.width = Math.floor(displaySize_x * scale);
            ctx!.canvas.height = Math.floor(displaySize_y * scale);

            ctx!.scale(scale, scale);
            ctx!.font = '10px Arial';
            ctx!.textAlign = 'center';

            const OrangeCircle = (n: number): void => {
                ctx!.save();
                ctx!.beginPath();
                ctx!.strokeStyle = "orange";
                ctx!.lineWidth = 12;
                ctx!.arc(center_x, center_y, ctx!.canvas.clientWidth / 5, -Math.PI / 2, -Math.PI / 2 + n * rad, false);
                ctx!.stroke();
                ctx!.restore();
            }

            const whiteCircle = () => {
                ctx!.save();
                ctx!.beginPath();
                ctx!.strokeStyle = "coral";
                ctx!.lineWidth = 12;
                ctx!.arc(center_x, center_y, ctx!.canvas.clientWidth / 5, 0, Math.PI * 2, false);
                ctx!.stroke();
                ctx!.closePath();
                ctx!.restore();
            }

            const text = (n: number) => {

                let text = (n: number) => {

                    let result: string;

                    if (n < 95) {
                        result = (20 - n / 5).toFixed() + " Sec"
                    }
                    else {
                        result = 'Reloading...'
                    }

                    return result
                }
                ctx!.save();
                ctx!.fillStyle = "white";
                ctx!.font = "1.1em Arial";
                ctx!.textAlign = "center";
                ctx!.textBaseline = "middle";
                ctx!.fillText(text(n), center_x, center_y);
                ctx!.restore();
            }

            const drawFrame = () => {

                window.requestAnimationFrame(drawFrame);

                ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

                whiteCircle();
                text(progress);
                OrangeCircle(progress);

            }

            const canvasInterval = timers.setInterval(() => {
                if (progress > 100) {
                    progress = 0;
                    UpdateInfo();
                };
                progress += 0.1;
            }, 20);

            drawFrame();
            
            return ()=>timers.clearInterval(canvasInterval);
           
        }


    }, []);

    return (

        <div className="card-body mb-0 pb-0">
            <canvas ref={canvasRef}></canvas>
            <div className="row justify-content-center mt-0 pt-0 pb-0">
                <p>Reloading in 20 Seconds...</p>
            </div>
        </div>

    );

};

export default Canvas;
