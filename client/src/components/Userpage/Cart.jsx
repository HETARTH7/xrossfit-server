import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Cart = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useState([]);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    axios
      .get(`/cart/${auth.username}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  });
  return (
    <div className="row">
      <Navbar />
      <div className="d-flex">
        <h1 className="m-5">{auth.username}'s Cart</h1>
        <img src="/cart.svg" alt="" style={{ width: "2rem" }} />
      </div>

      {cart.map((product, index) => {
        return (
          <div
            key={index}
            className="card inline ms-4 mb-4"
            style={{ width: "18rem" }}
          >
            <img src={product.img} className="card-img-top" alt="" />
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price * product.quantity}</p>
                <p className="card-text"></p>
                <select
                  defaultValue={product.quantity}
                  onChange={(e) =>
                    axios.put(`/cart/${product._id}`, {
                      quantity: e.target.value,
                    })
                  }
                  className="form-select m-2"
                >
                  {quantities.map((quantity, idx) => {
                    return <option key={idx}>{quantity}</option>;
                  })}
                </select>
              </div>
              <div className="mt-auto">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    axios.delete(`/cart/${product._id}`);
                  }}
                >
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
