import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user/UserProvider";
import { authService, type LoginCredentials, type SignupCredentials } from "../services/auth.service";

export const useAuth = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (user) => {
      setUser(user);
      // Store user ID in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // Navigate to chat page
      navigate("/chat");
    },
    onError: (error: Error) => {
      alert(`Login failed: ${error.message}`);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (credentials: SignupCredentials) => authService.signup(credentials),
    onSuccess: (user) => {
      setUser(user);
      // Store user ID in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      // Navigate to chat page
      navigate("/chat");
    },
    onError: (error: Error) => {
      alert(`Signup failed: ${error.message}`);
    },
  });

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    isLoginPending: loginMutation.isPending,
    isSignupPending: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
}; 