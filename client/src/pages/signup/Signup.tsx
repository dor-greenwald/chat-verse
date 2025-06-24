import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isSignupPending } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    signup({ email, password });
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
          disabled={isSignupPending}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={isSignupPending}
        />
        <button type="submit" onClick={handleSignup} disabled={isSignupPending}>
          {isSignupPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
