  import { useState } from "react";
  import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../contexts/user/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoginPending } = useAuth();
  const navigate = useNavigate();
  // if user is already logged in, redirect to chat page
  const { user } = useUser();
  if (user) {
    navigate("/chat");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2>Login</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minWidth: 300,
        }}
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
          disabled={isLoginPending}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={isLoginPending}
        />
        <button type="submit" onClick={handleLogin} disabled={isLoginPending}>
          {isLoginPending ? "Logging in..." : "Login"}
        </button>
        <a href="/signup">
          <Navigate to="/login" replace />
          signup
        </a>
      </form>
    </div>
  );
};

export default Login;
