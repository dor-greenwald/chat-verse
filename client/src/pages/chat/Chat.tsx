import { Header } from "../../components/header/Header";
import { Message } from "../../components/message/Message";
import { SendNewMessage } from "../../components/send-new-message/SendNewMessage";
import { useChat } from "../../contexts/chats/ChatsProvider";
import { useMessages } from "../../contexts/messages/MessagesProvider";
import { useUser } from "../../contexts/user/UserProvider";
import "./chatPage.scss";

export const Chat = () => {
  const { messages } = useMessages();
  const { chat } = useChat();
  const { user } = useUser();

  return (
    <div className="chat-page-container">
      <Header
        title={
          chat?.groupName ||
          (chat?.participants.length && chat?.participants.length > 2)
            ? "Group Chat"
            : chat?.participants.filter((u) => u.id !== user?.id)[0].username ||
              "Chat"
        }
        level={user?.level || 1}
        xp={user?.totalXp || 0}
      />
      <div className="messages">
        {messages?.map((message) => {
          console.log("message: ", message);
          console.log(
            "message.senderId === user?.id: ",
            message.senderId === user?.id
          );
          return (
            <Message
              key={message.id}
              text={message.text}
              senderName={message.senderName}
              timestamp={new Date(message.createdAt).toLocaleTimeString()}
              isSender={message.senderId === user?.id}
            />
          );
        })}
      </div>
      <SendNewMessage />
    </div>
  );
};
