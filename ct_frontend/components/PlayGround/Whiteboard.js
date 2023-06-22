import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClear } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { CirclePicker } from "react-color";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../Loader";
import config from "../../config";
import Spinner from "../Spinner";

export default function Whiteboard({ username }) {
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const router = useRouter();

  const canvasRef = useRef(null);
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  }, [auth_token]);

  const [ws, setWs] = useState(undefined);
  const [con, setCon] = useState(false);
  useEffect(() => {
    setWs(new WebSocket(`${config.whiteboardWS}`));
    setCon(true);
  }, []);

  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", () => {
        console.log("open connection");

        ws.send(
          JSON.stringify({
            command: "join",
            groupname: username,
            user_name: cookieUsername["username"],
          })
        );
      });

      ws.onmessage = (e) => {
        console.log("message arrived");

        const data = JSON.parse(e.data);
        if (data.warning) {
          alert("Something went wrong");
        } else if (data.command === "canvas-data") {
          const image = new Image();
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          image.onload = function () {
            ctx.drawImage(image, 0, 0);
          };
          image.src = data.data;
        } else if (data.command === "canvas-clear") {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      drawOnCanvas();
    }
  }, [ws]);

  let timeout;
  const [currentColor, setCurrentColor] = useState("blue");
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    if (ws) {
      drawOnCanvas();
    }
  }, [brushSize, currentColor]);

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let mouse = { x: 0, y: 0 };
    let last_mouse = { x: 0, y: 0 };

    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    const onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = currentColor;
      ctx.stroke();

      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        const base64Imagedata = canvas.toDataURL("image/png");

        console.log("sending data");
        ws.send(
          JSON.stringify({
            command: "canvas-data",
            data: base64Imagedata,
            token: auth_token,
            groupname: username,
            user_name: cookieUsername["username"],
          })
        );
      }, 1000);
    };
  };

  const clearCanvas = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          command: "canvas-clear",
          token: auth_token,
          groupname: username,
          user_name: cookieUsername["username"],
        })
      );
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sendCanvasData(canvas.toDataURL());
    }
  };

  const sendCanvasData = (data) => {
    ws.send(
      JSON.stringify({
        command: "canvas-data",
        data: data,
        token: auth_token,
        groupname: username,
        user_name: cookieUsername["username"],
      })
    );
  };

  const disconnectBoard = () => {
    ws.close();
    router.push(`/playground/${username}`);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleBrushSizeChange = (event) => {
    setBrushSize(event.target.value);
  };

  const drawShape = (shape) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    ctx.lineWidth = brushSize;

    switch (shape) {
      case "rectangle":
        console.log("rectangle called");
        ctx.fillRect(10, 10, 100, 100);
        break;
      case "circle":
        console.log("circle");
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(150, 150);
        ctx.lineTo(50, 150);
        ctx.closePath();
        ctx.fill();
        break;
      default:
        break;
    }

    sendCanvasData(canvas.toDataURL());
  };

  return (
    <>
      {ws ? (
        <div className="">
          <div className="flex gap-3 justify-between items-start m-3 absolute right-0 overflow-hidden bg-transparent w-full">
            <div className="flex items-start gap-3 ml-4">
              <button
                className="bg-success text-black p-3 rounded-full text-xl"
                onClick={() => {
                  disconnectBoard();
                }}
              >
                <MdArrowBack />
              </button>

              <button
                className="bg-success text-black p-3 rounded-full text-xl"
                onClick={() => clearCanvas()}
              >
                <AiOutlineClear />
              </button>
            </div>
            <CirclePicker
              color={currentColor}
              onChange={handleColorChange}
              className=""
            />
          </div>
          <div id="sketch" className="sketch">
            <canvas
              id="canvas"
              className="bg-white w-full"
              ref={canvasRef}
            ></canvas>
          </div>

          <div className="mt-2 bg-[#1C1C28]">
            <label htmlFor="brushSize">Brush Size:</label>
            <input
              type="range"
              id="brushSize"
              name="brushSize"
              min="1"
              max="20"
              value={brushSize}
              onChange={handleBrushSizeChange}
            />

            <div className="flex gap-3 justify-center items-center mt-4">
              <button
                className="bg-white text-black p-3 rounded-full"
                onClick={() => drawShape("rectangle")}
              >
                Rectangle
              </button>
              <button
                className="bg-white text-black p-3 rounded-full"
                onClick={() => drawShape("circle")}
              >
                Circle
              </button>
              <button
                className="bg-white text-black p-3 rounded-full"
                onClick={() => drawShape("triangle")}
              >
                Triangle
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
