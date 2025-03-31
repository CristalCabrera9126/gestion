import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // Asegúrate de usar la URL correcta

export const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);

        newSocket.on("connect", () => {
            console.log("Conectado al servidor Socket.IO");
        });

        newSocket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        if (socket) {
            socket.emit("message", message);
        }
    };

    return { messages, sendMessage };
};