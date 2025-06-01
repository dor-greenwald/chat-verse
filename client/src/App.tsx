import { Chat } from "./pages/chat/Chat";
import "./app.scss";
import { UserProvider } from "./contexts/user/UserProvider";
import { ChatProvider } from "./contexts/chats/ChatsProvider";
import { MessagesProvider } from "./contexts/messages/MessagesProvider";

function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <MessagesProvider>
          <Chat />
        </MessagesProvider>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
