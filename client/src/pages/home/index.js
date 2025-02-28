import { AuthContextProvider } from "@/app/AuthContext";
import TrackingPage from "@/components/TrackingPage";

const Homepage = () => {
  return (
    <AuthContextProvider>
      <TrackingPage />
    </AuthContextProvider>
  );
};

export default Homepage;
