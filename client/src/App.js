import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Rooms from "./components/rooms";
import Message from "./components/message";
import Chat from "./components/chat";
import ScrollToBottom from "react-scroll-to-bottom";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [settedUsername, setSettedUsername] = useState(false);

  const sendMessage = async () => {
    if (username !== "" && room !== "" && message !== "") {
      const data = {
        username: username,
        room: room,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", data);
      setMessage("");
    }
  };

  const chatUpdate = async (e) => {
    socket.emit("join_room", e);
  };

  useEffect(() => {
    if (room !== "") socket.emit("chatUpdate", room);
    socket.on(
      "receive_chat",
      (data) => {
        setChat(data);
      },
      [socket]
    );
  });

  return (
    <div className="App flex flex-row items-center h-screen w-screen align-middle justify-center  duration-300">
      {settedUsername !== false ? (
        <div className="flex flex-col h-screen w-full rounded-md duration-300">
          <div className="duration-300 flex flex-row w-full h-full items-start rounded-b-md">
            <div className="w-1/4 bg-slate-900 flex flex-col justify-start h-full  drop-shadow-xl rounded-bl-md duration-300">
              <div className="duration-300  w-full shadow-2xl text-2xl text-neutral-50 font-mono font-extrabold ">
                <div className="bg-emerald-500">Room: {room} </div>
                <div className=" bg-sky-500">User: {username}</div>
              </div>
              <Rooms setRoom={setRoom} chatUpdate={chatUpdate} />
            </div>
            {room !== "" ? (
              <div className="flex flex-col h-full w-3/4 rounded-br-md duration-300">
                <div className="w-full bg-slate-500 h-full duration-300 overflow-auto">
                  <ScrollToBottom className="w-full bg-slate-500 h-full duration-300 overflow-auto">
                    <Chat chat={chat} room={room} username={username} />
                  </ScrollToBottom>
                </div>
                <div className="w-full bg-slate-700 min-h-14 rounded-br-md  duration-300 flex flex-row ">
                  <Message
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-3/4 rounded-br-md h-full bg-slate-500 duration-300">
                <div className="my-auto">
                  Welcome to Chat, please select room
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end">
          <div className="flex justify-center align-middle">
            <input
              className="m-2 bg-[#191d20] text-white text-center p-1 font-extralight text-lg duration-300 border-b-2 focus:border-b-emerald-400 outline-none"
              type="text"
              placeholder="please set username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button
              className="p-5 bg-emerald-400 w-min h-min m-2 rounded-xl"
              onClick={() => {
                if (username === "") return alert("Please set valid username");
                setSettedUsername(true);
              }}
            >
              SET
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
