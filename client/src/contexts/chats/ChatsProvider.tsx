//ChatProvider
import React, { createContext, useContext, useState, useEffect } from "react";
import { type Chat } from "../../interfaces/interfaces";
import { fakeChatData } from "../../fake-data/fakeData";

const ChatContext = createContext<
  | {
      chat?: Chat;
      setChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
    }
  | undefined
>(undefined);

interface ChatContextProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatContextProps> = ({ children }) => {
  const [chat, setChat] = useState<Chat | undefined>(undefined);

  useEffect(() => {
    // Fetch Chat data from API or local storage
    const fetchChat = async () => {
      const storedChat = localStorage.getItem("chat");
      const chatData = storedChat ? JSON.parse(storedChat) : fakeChatData; //TODO: replace with actual api call
      setChat(chatData);
      localStorage.setItem("chat", JSON.stringify(chatData));
    };

    fetchChat();
  }, []);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
