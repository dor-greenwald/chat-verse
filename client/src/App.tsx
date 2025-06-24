import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chat } from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { UserProvider } from "./contexts/user/UserProvider";
import { ChatProvider } from "./contexts/chats/ChatsProvider";
import { MessagesProvider } from "./contexts/messages/MessagesProvider";
import "./app.scss";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
