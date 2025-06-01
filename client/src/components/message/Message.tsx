import clsx from "clsx";
import { useUser } from "../../contexts/user/UserProvider";
import "./message.scss";

interface MessageProps {
  text: string;
  senderName: string;
  timestamp: string;
  isSender: boolean;
}

export const Message = ({
  text,
  senderName,
  timestamp,
  isSender,
}: MessageProps) => {
  const { user } = useUser();

  return (
    <div className={clsx("message", isSender ? "sent" : "received")}>
      <div className="message-body">
        {senderName !== user?.username && (
          <span className="message-sender">{senderName}</span>
        )}
        <p className="message-text">{text}</p>
      </div>
      <span className="message-info">
        <span className="message-timestamp">{timestamp}</span>
      </span>
    </div>
  );
};
