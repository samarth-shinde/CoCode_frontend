import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { FaCode } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiCodeCurly } from "react-icons/bi";
import Link from "next/link";
import ChatMenu from "../ChatMenu";
import { ToolStateContext } from "../../store/ToolStateContext";
import moment from "moment";

export default function ChatLayout({ messages, sendMessage, username }) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);

  const [auth_token, setAuthToken] = useState("");
  const [text, setText] = useState("");

  const { tooltipshow, setTooltipshow, modaltoggle, setModaltoggle } =
    useContext(ToolStateContext);
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(text);
      setText("");
    }
  };
  return (
    <>
      <div className=" h-[68vh] relative pb-0 md:pb-0 w-full">
        <div className=" p-4 flex justify-between items-center">
          <Link href={`/playground/${username}`}>
            <a className="text-xl text-primary">
              <MdArrowBackIosNew />
            </a>
          </Link>

          <div className="flex justify-end items-center">
            <div className="rounded-full p-2 border-2 border-indigo-800">
              <BiCodeCurly />
            </div>
            <p className="mx-3 subpixel-antialiased text-md text-white border-indigo-800 border-2 rounded-xl p-4 ">
              {cookieUsername["username"]}
            </p>
          </div>
        </div>

        <div
          id="chat-window"
          className=" h-full pt-8 px-4 md:px-16 overflow-y-scroll scrollbar"
        >
          <div className=" max-w-full   flex flex-col flex-wrap relative">
            {messages.map((message, index) => {
              if (message.user_name === cookieUsername["username"]) {
                return (
                  <div key={index} className=" mb-5 w-fit relative self-end">
                    <div className="  bg-gradient-to-t from-blue-700 to-sky-500 px-4 py-[6px] rounded-lg ">
                      <p className="text-lg">{message.message}</p>
                    </div>
                    <span className="text-sm">
                      {moment(message.timestamp).format("hh:mm a")}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div key={index} className=" mb-5 w-fit relative">
                    <h2 className=" subpixel-antialiased text-sm align-text-top  items-start">
                      @{message.user_name}
                    </h2>
                    <div className=" bg-gradient-to-b from-blue-700 to-indigo-600 px-4 py-[6px] rounded">
                      <p className="text-lg">{message.message}</p>
                    </div>
                    <span className="text-sm">
                      {moment(message.timestamp).format("hh:mm a")}
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="top-100 w-full px-1 mt-2">
          <div className="flex justify-center w-full">
            <ChatMenu username={username} />
            <input
              type="text"
              value={text}
              placeholder="Enter your message..."
              className="rounded-md px-2 mx-6 w-100% bg-offBlack border-purple-600"
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
            <button
              id="loginbtn"
              className="items-center justify-center rounded-md px-6 py-2 ease-in-out duration-300 ml-1 font-semibold"
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 6px;
        }

        .scrollbar::-webkit-scrollbar-track {
          background-color: #020617;
        }

        .scrollbar::-webkit-scrollbar-thumb {
          background-color: #be24fe;
          border-radius: 3px;icons/search?q=Arrow
        }

        .scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
