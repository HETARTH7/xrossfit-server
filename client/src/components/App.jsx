import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Details from "./Details";
import Footer from "./Footer";
import Dashboard from "./user/Dashboard";
import Exercises from "./user/Exercises";
import CreateExercise from "./user/CreateExercise";
import AdminLogin from "./admin/AdminLogin";
import AdminPortal from "./admin/AdminDashboard";
import Profile from "./user/Profile";
import Settings from "./user/Settings";
import Stock from "./admin/Stock";
import User from "./admin/User";
import Shop from "./user/Shop";
import Cart from "./user/Cart";
import Payment from "./user/Payment";
import Orders from "./admin/Orders";
import OrderHistory from "./user/OrderHistory";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<Details />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminPortal />} />
          <Route path="/manageusers" element={<User />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/track" element={<CreateExercise />} />
          <Route path="/exercises-list" element={<Exercises />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/adminorders" element={<Orders />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
