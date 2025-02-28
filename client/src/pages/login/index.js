import { AuthContextProvider } from "@/app/AuthContext";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <AuthContextProvider>
      <LoginForm />
    </AuthContextProvider>
  );
}
