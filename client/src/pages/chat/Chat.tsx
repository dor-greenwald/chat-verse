import { Header } from "../../components/header/Header";
import { Message } from "../../components/message/Message";
import { SendNewMessage } from "../../components/send-new-message/SendNewMessage";
import { useChat } from "../../contexts/chats/ChatsProvider";
import { useMessages } from "../../contexts/messages/MessagesProvider";
import { useUser } from "../../contexts/user/UserProvider";
import type { ChatMessage } from "../../interfaces/interfaces";
import { isSameWeek } from "date-fns";
import "./chatPage.scss";
import { UserStatus } from "../../enums/enums";
import { useEffect } from "react";
import { useWebSocketContext } from "../../contexts/websocket/WebSocketProvider";
import React from "react";

export const Chat = () => {
  const { messages, setMessages } = useMessages();
  const { chat } = useChat();
  const { user } = useUser();
  const { onMessage } = useWebSocketContext();

  useEffect(() => {
    const unsubscribe = onMessage((message: ChatMessage) => {
      setMessages((prevState: ChatMessage[] | undefined) => [
        ...(prevState || []),
        message
      ]);
    });
    return () => unsubscribe();
  }, [setMessages, onMessage]);

  const isDayChange = (
    currentMessage: ChatMessage,
    nextMessage: ChatMessage
  ) => {
    return (
      new Date(currentMessage.createdAt).getDate() !==
      new Date(nextMessage.createdAt).getDate()
    );
  };

  const getDateSeparator = (date: Date) => {
    const today = new Date();
    //if today return "Today"
    if (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    ) {
      return "Today";
    }
    //if in the same week, return the day of the week
    if (isSameWeek(today, date, { weekStartsOn: 1 })) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    }
    //if not today or in the same week, return the full date
    return date.toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getOnlineMembersCount = () => {
    return chat?.participants.filter(
      (p) => p.id !== user?.id && p.status === UserStatus.Online
    ).length;
  };

  const onlineMembersText = () => {
    const onlineCount = getOnlineMembersCount();
    if (onlineCount === 1) {
      if (chat?.participants.length === 2) {
        return "online";
      }
      return "1 member online";
    } else {
      return `${onlineCount} members online`;
    }
  };

  return (
    <div
      className={`chat-page-container${getOnlineMembersCount() ? "" : " no-online-members"}`}
    >
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
      {!!getOnlineMembersCount() && (
        <div className="online-members">
          {onlineMembersText()}
          <div className="online-circle"></div>
        </div>
      )}
      <div className="messages">
        {messages
          ?.filter((message) => message.chatId === chat?.id)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((message, index) => {
            return (
              <React.Fragment key={message.id}>
                <Message
                  text={message.text}
                  senderName={message.senderName}
                  timestamp={new Date(message.createdAt).toLocaleTimeString(
                    "en-US",
                    {
                      hourCycle: "h23",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                  isSender={message.senderId === user?.id}
                />
                {messages[index + 1] &&
                  isDayChange(message, messages[index + 1]) && (
                    <div className="date-separator">
                      {getDateSeparator(
                        new Date(messages[index + 1].createdAt)
                      )}
                    </div>
                  )}
              </React.Fragment>
            );
          })}
      </div>
      <SendNewMessage />
    </div>
  );
};
