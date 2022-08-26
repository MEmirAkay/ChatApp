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
  }, [room]);

  return (
    <div className="App flex flex-col container mx-auto duration-300">
      {settedUsername != false ? (
          <div className="flex flex-col h-screen w-full rounded-md duration-300">
            <div className="duration-300 rounded-t-md w-full shadow-2xl bg-emerald-500 text-2xl text-neutral-50 font-mono font-extrabold pt-2">
              Room: {room}
            </div>
            <div className="duration-300 flex flex-row w-full h-full rounded-b-md">
              <div className="w-1/4 bg-slate-900 drop-shadow-xl h-full rounded-bl-md duration-300">
                <Rooms setRoom={setRoom} chatUpdate={chatUpdate} />
              </div>
              {room !== "" ? (
                <div className="flex flex-col w-3/4 h-full rounded-br-md duration-300">
                  <div className="w-full bg-slate-500 duration-300 h-full overflow-auto">
                    <Chat chat={chat} room={room} username={username} />
                  </div>
                  <div className="w-full bg-slate-700 rounded-br-md duration-300 flex flex-row ">
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
      ) : (
        <div>
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
                if (username == "") return alert("Please set valid username");
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
