import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Chat } from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { UserProvider } from "./contexts/user/UserProvider";
import { ChatProvider } from "./contexts/chats/ChatsProvider";
import { MessagesProvider } from "./contexts/messages/MessagesProvider";
import { WebSocketProvider } from './contexts/websocket/WebSocketProvider';
import "./app.scss";

const App = () => {
  return (
    <WebSocketProvider>
      <UserProvider>
        <ChatProvider>
          <MessagesProvider>
            <Router>
              <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </MessagesProvider>
        </ChatProvider>
      </UserProvider>
    </WebSocketProvider>
  );
};

export default App;
