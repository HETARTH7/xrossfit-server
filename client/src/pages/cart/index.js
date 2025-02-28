import { AuthContextProvider } from "@/app/AuthContext";
import CartPage from "@/components/CartPage";

const Cart = () => {
  return (
    <AuthContextProvider>
      <CartPage />
    </AuthContextProvider>
  );
};

export default Cart;
