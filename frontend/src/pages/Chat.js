import {
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";

import { io }
from "socket.io-client";

import { useParams }
from "react-router-dom";

import Navbar
from "../components/Navbar";

import API
from "../services/api";

import {
  AuthContext,
}
from "../context/AuthContext";

const socket =
  io("http://localhost:5000");

export default function Chat() {

  const { roomId } =
    useParams();

  const { user } =
    useContext(AuthContext);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const messagesEndRef =
    useRef(null);

  // LOAD OLD MESSAGES
  useEffect(() => {

    if (!user || !roomId)
      return;

    fetchMessages();

  }, [roomId, user]);

  const fetchMessages =
  async () => {

    try {

      const { data } =
        await API.get(
          `/chat/${roomId}`
        );

      setMessages(data);

    } catch (error) {

      console.log(error);

    }

  };

  // SOCKET CONNECTION
  useEffect(() => {

    if (!user || !roomId)
      return;

    socket.emit(
      "joinRoom",
      roomId
    );

    socket.on(
      "receiveMessage",
      (data) => {

        setMessages(
          (prev) => [
            ...prev,
            data,
          ]
        );

      }
    );

    return () => {

      socket.off(
        "receiveMessage"
      );

    };

  }, [roomId, user]);

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current
    ?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // LOGIN CHECK
  if (!user) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <h1 className="
          text-3xl
          font-bold
        ">
          Please Login First
        </h1>

      </div>

    );

  }

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim())
      return;

    const data = {

      roomId,

      sender:
        user.name,

      text:
        message,

      createdAt:
        new Date(),

    };

    socket.emit(
      "sendMessage",
      data
    );

    setMessage("");

  };

  return (

    <div className="
      min-h-screen
      bg-gray-100
    ">

      <Navbar />

      <div className="
        max-w-4xl
        mx-auto
        p-6
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-6
        ">
          Real Time Chat
        </h1>

        <div className="
          bg-white
          h-[600px]
          overflow-y-auto
          rounded-xl
          shadow-lg
          p-6
          flex
          flex-col
          gap-4
        ">

          {
            messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={`
                    flex
                    ${
                      msg.sender ===
                      user.name
                        ? "justify-end"
                        : "justify-start"
                    }
                  `}
                >

                  <div
                    className={`
                      max-w-xs
                      p-4
                      rounded-2xl
                      shadow
                      ${
                        msg.sender ===
                        user.name
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200"
                      }
                    `}
                  >

                    <h2 className="
                      text-sm
                      font-bold
                      mb-1
                    ">
                      {msg.sender}
                    </h2>

                    <p>
                      {msg.text}
                    </p>

                    <p className="
                      text-xs
                      mt-2
                      opacity-70
                    ">
                      {
                        msg.createdAt
                          ? new Date(
                              msg.createdAt
                            ).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : ""
                      }
                    </p>

                  </div>

                </div>

              )
            )
          }

          <div
            ref={messagesEndRef}
          />

        </div>

        <div className="
          flex
          gap-4
          mt-6
        ">

          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e)=>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e)=>{

              if (
                e.key === "Enter"
              ) {

                sendMessage();

              }

            }}
            className="
              flex-1
              border
              p-4
              rounded-xl
              outline-none
            "
          />

          <button
            onClick={
              sendMessage
            }
            className="
              bg-orange-500
              text-white
              px-8
              rounded-xl
              font-bold
            "
          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

}