import { AuthContextProvider } from "@/app/AuthContext";
import SignupForm from "@/components/SignupForm";

export default function Signup() {
  return (
    <AuthContextProvider>
      <SignupForm />
    </AuthContextProvider>
  );
}
