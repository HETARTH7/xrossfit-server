import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Checkout = () => {
  const { auth } = useAuth();
  const user = auth.username;
  const navigate = useNavigate();
  const pay = () => {
    axios
      .post(`http://localhost:5000/order/${user}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    alert("Your order has been placed successfully");
    navigate("/store");
  };
  return (
    <div>
      <Link className="btn" to={"/store"}>
        Cancel
      </Link>
      <button className="btn" onClick={pay}>
        Pay
      </button>
    </div>
  );
};

export default Checkout;
