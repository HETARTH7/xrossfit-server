import Home from "./homePage/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./homePage/Login";
import Register from "./homePage/Register";
import Details from "./homePage/Details";
import Footer from "./homePage/Footer";
import Dashboard from "./usersPage/Dashboard";
import Exercises from "./usersPage/Exercises";
import CreateExercise from "./usersPage/CreateExercise";
import AdminLogin from "./adminPage/AdminLogin";
import AdminPortal from "./adminPage/AdminDashboard";
import Profile from "./usersPage/Profile";
import Settings from "./usersPage/Settings";
import Stock from "./adminPage/Stock";
import User from "./adminPage/User";
import Shop from "./usersPage/Shop";
import Cart from "./usersPage/Cart";
import Payment from "./usersPage/Payment";
import Orders from "./adminPage/Orders";
import OrderHistory from "./usersPage/OrderHistory";
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
