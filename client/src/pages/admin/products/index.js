import { AuthContextProvider } from "@/app/AuthContext";
import AdminProductsPage from "@/components/AdminProductsPage";

const ManageProducts = () => {
  return (
    <AuthContextProvider>
      <AdminProductsPage />
    </AuthContextProvider>
  );
};

export default ManageProducts;
