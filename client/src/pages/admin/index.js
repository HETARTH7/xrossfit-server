import { AuthContextProvider } from "@/app/AuthContext";
import AdminNavbar from "@/components/AdminNavbar";

const Admin = () => {
  return (
    <AuthContextProvider>
      <AdminNavbar />
    </AuthContextProvider>
  );
};

export default Admin;
