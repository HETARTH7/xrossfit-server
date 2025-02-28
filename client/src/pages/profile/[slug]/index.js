import { AuthContextProvider } from "@/app/AuthContext";
import ProfilePage from "@/components/ProfilePage";

const Profile = () => {
  return (
    <AuthContextProvider>
      <ProfilePage />
    </AuthContextProvider>
  );
};

export default Profile;
