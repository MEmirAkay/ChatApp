import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Rooms from "./components/rooms";
import Message from "./components/message";
import Chat from "./components/chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

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
    }
    chatUpdate(room);
  };

  const chatUpdate = (e) => {
    socket.emit("chatUpdate", e);
    socket.on("receive_chat", (data) => {
      console.log(data);
      setChat(data);
    });
  };

  useEffect(() => {
    if (room !== "") chatUpdate(room);
  },[room]);

  return (
    <div className="App flex flex-col container mx-auto duration-300">
      <div className="flex justify-center">
        <input
          className="m-2 bg-[#191d20] text-white text-center p-1 font-extralight text-lg duration-300 border-b-2 focus:border-b-emerald-400 outline-none"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>

      <div className="flex w-full duration-300 h-screen">
        <div className="flex flex-col w-full rounded-md duration-300">
          <div className="duration-300 rounded-t-md w-full h-12 shadow-2xl bg-emerald-500 text-2xl text-neutral-50 font-mono font-extrabold pt-2">
            Room: {room}
          </div>

          <div className="duration-300 flex flex-row w-full h-full rounded-b-md">
            <div className="w-1/4 bg-slate-900 drop-shadow-xl rounded-bl-md duration-300">
              <Rooms setRoom={setRoom} chatUpdate={chatUpdate} />
            </div>
            {room !== "" ? (
              <div className="flex flex-col w-3/4 h-full rounded-br-md duration-300">
                <div className="w-full h-full bg-slate-500 duration-300">
                  <Chat chat={chat} room={room} username={username} />
                </div>
                <div className="w-full bg-slate-700 rounded-br-md duration-300 ">
                  <Message
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-3/4 rounded-br-md bg-slate-500 duration-300">
                <div className="my-auto">
                  Welcome to Chat, please select room
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
