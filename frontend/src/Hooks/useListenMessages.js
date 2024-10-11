import { useEffect } from "react";
import { useSocketContext } from "../context/socketContent";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleMessage);

    // Cleanup the event listener on component unmount
    return () => socket.off("newMessage", handleMessage);
  }, [socket, setMessages]);

  return null; // Optional, can remove if no return is needed
};

export default useListenMessages;
