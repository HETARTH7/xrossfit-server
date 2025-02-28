import { AuthContextProvider } from "@/app/AuthContext";
import ProductsPage from "@/components/ProductsPage";

export default function Shop() {
  return (
    <AuthContextProvider>
      <ProductsPage />
    </AuthContextProvider>
  );
}
