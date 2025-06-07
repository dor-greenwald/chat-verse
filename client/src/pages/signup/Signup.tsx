import { useState } from "react";
import { useUser } from "../../contexts/user/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("hi");
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || response.statusText}`);
        return;
      }

      const user = await response.json();
      setUser(user);
    } catch (error) {
      alert("Login failed: Network or server error");
      console.error(error);
    }
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
      <h2>Sign up</h2>
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
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
