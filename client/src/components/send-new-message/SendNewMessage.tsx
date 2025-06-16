import IconButton from "@mui/material/IconButton";
import { OutlinedInput } from "@mui/material";
import "./sendNewMessage.scss";
import { useState } from "react";
import { useMessages } from "../../contexts/messages/MessagesProvider";
import { useUser } from "../../contexts/user/UserProvider";
import { useChat } from "../../contexts/chats/ChatsProvider";
import type { ChatMessage } from "../../interfaces/interfaces";
import { websocketService } from "../../services/websocket.service";

export const SendNewMessage = () => {
  const [newMessage, setNewMessage] = useState("");
  const { setMessages } = useMessages();
  const { user } = useUser();
  const { chat } = useChat();

  const sendMessage = () => {
    if (!user?.username || !chat?.id || !newMessage.trim()) return;

    // Create message object
    const message = {
      content: newMessage,
      timestamp: new Date().toISOString(),
      chatId: chat.id,
      senderId: user.id,
      senderName: user.username,
    };

    // Send message through WebSocket
    websocketService.sendMessage(message);

    // Update local state
    setMessages((prevState: ChatMessage[] | undefined) => [
      ...(prevState || []),
      {
        id: Date.now().toString(),
        chatId: chat.id,
        senderId: user.id,
        text: newMessage,
        senderName: user.username!,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="send-new-message-container">
      <IconButton className="attach-file-button">
        <img src="/images/icons/file-attach.svg" alt="attach a file" />
      </IconButton>
      <OutlinedInput
        className="message-input"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        endAdornment={
          <IconButton className="emoji-button">
            <img src="/images/icons/emoji.svg" alt="add emoji" />
          </IconButton>
        }
      />
      <IconButton className="send-button" onClick={sendMessage}>
        <img src="/images/icons/send.svg" alt="send message" />
      </IconButton>
    </div>
  );
};
