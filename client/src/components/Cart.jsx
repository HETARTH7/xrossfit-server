import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

const Cart = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/order/cart/${user.email}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setCartItems(data[0].products);
          setOrder(data[0]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) {
      fetchCart();
    }
  });

  const handleIncrement = async (item) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.email,
        product: item.product,
        price: item.price,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
    }
  };

  const handleDecrement = async (item) => {
    const response = await fetch("http://localhost:5000/order/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.email,
        product: item.product,
        price: item.price,
      }),
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
    }
  };

  const handleDelete = async (item) => {
    const response = await fetch(
      `http://localhost:5000/order/${order._id}/${item._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json);
    }
  };

  const checkout = async () => {
    const response = await fetch(
      `http://localhost:5000/order/place/${order._id}`,
      { method: "PUT" }
    );
    const json = await response.json();
    if (response.ok) console.log(json);
    window.location = "/shop";
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Your Cart</h2>
        <ul className="list-group">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{item.product}</span>
              <div className="btn-group">
                <button
                  hidden={item.quantity === 1}
                  className="btn"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="m-2">{item.quantity}</span>
                <button className="btn" onClick={() => handleIncrement(item)}>
                  +
                </button>
                <img
                  onClick={() => handleDelete(item)}
                  src="/delete.svg"
                  alt=""
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <strong>Total:</strong> ₹{order.totalPrice}
        </div>
        <button onClick={checkout}>Pay</button>
      </div>
    </div>
  );
};

export default Cart;
