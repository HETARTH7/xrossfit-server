import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useState([]);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let total = 0;
  useEffect(() => {
    axios
      .get(`/cart/${auth.username}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <h1 className="m-5">{auth.username}'s Cart</h1>
        <img src="/cart.svg" alt="" style={{ width: "2rem" }} />
      </div>
      {cart.length === 0 ? (
        <div>
          <h1>Your cart is empty</h1>
        </div>
      ) : (
        <div className="row">
          {cart.map((product, index) => {
            total += product.price * product.quantity;
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
                    <p className="card-text">
                      ₹{product.price * product.quantity}
                    </p>
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
          <hr />
          <p>Total: {total}</p>
          <Link className="btn btn-success m-2" to={"/checkout"}>
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
