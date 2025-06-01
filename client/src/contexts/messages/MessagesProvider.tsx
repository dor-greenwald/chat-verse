//userProvider
import React, { createContext, useContext, useState, useEffect } from "react";
import { type ChatMessage } from "../../interfaces/interfaces";
import { fakeMessageData } from "../../fake-data/fakeData";

const MessagesContext = createContext<
  | {
      messages: ChatMessage[] | undefined;
      setMessages: React.Dispatch<
        React.SetStateAction<ChatMessage[] | undefined>
      >;
    }
  | undefined
>(undefined);

interface MessagesContextProps {
  children: React.ReactNode;
}

export const MessagesProvider: React.FC<MessagesContextProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[] | undefined>(
    undefined
  );

  useEffect(() => {
    // Fetch messages data from API or local storage
    const fetchMessages = async () => {
      const storedMessages = localStorage.getItem("messages");
      const messagesData = storedMessages
        ? JSON.parse(storedMessages)
        : fakeMessageData; //TODO: replace with actual api call
      setMessages(messagesData);
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
