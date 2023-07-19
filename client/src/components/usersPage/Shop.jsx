import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Shop = () => {
  const user = sessionStorage.getItem("user");
  const [item, setItem] = useState("");
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState();

  axios
    .get("http://localhost:5000/stock")
    .then((res) => setProduct(res.data))
    .catch((err) => console.log(err));

  const onClick = () => {
    const cartItem = { user, item, price };
    axios
      .post("http://localhost:5000/cart/add", cartItem)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <button>
        <Link to={"/cart"}>Cart</Link>
      </button>
      <button>
        <Link to={"/orderhistory"}>Order History</Link>
      </button>
      <div className="container" style={{ marginTop: "1.5rem" }}>
        {product.map((x, index) => {
          return (
            <div
              key={index}
              className="card-deck"
              style={{ width: "18rem", float: "left", margin: "1rem" }}
            >
              <div className="card">
                <p className="card-title">{x.name}</p>
                <p className="card-text">{x.price}</p>
                <button
                  onMouseEnter={() => {
                    setItem(x.name);
                    setPrice(x.price);
                  }}
                  onClick={onClick}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
