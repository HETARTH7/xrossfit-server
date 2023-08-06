import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Store = () => {
  const { auth } = useAuth();
  const user = auth.username;
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    axios
      .get("/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`/wishlist/${auth.username}`)
      .then((res) => setWishlist(res.data))
      .catch((err) => console.log(err));
  });
  return (
    <div className="row">
      <Navbar />
      <div className="d-flex">
        <h1 className="m-5">Xrossfit Store</h1>
        <Link to="/cart">
          <img
            src="/cart.svg"
            alt=""
            style={{ width: "2rem", marginTop: "4rem", marginRight: "3rem" }}
          />
        </Link>
      </div>
      {products.map((product, index) => {
        const isWishlisted = wishlist.some(
          (item) => item.productID === product._id
        );
        const wishlistItemId = wishlist.find(
          (item) => item.productID === product._id
        )?._id;
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
                <p className="card-text">₹{product.price}</p>
              </div>
              <div className="mt-auto">
                <img
                  src={isWishlisted ? "/wishlisted.svg" : "/wishlist.svg"}
                  alt=""
                  style={{ width: "2rem", marginRight: "2rem" }}
                  onClick={() => {
                    if (isWishlisted) {
                      axios.delete(`/wishlist/${wishlistItemId}`);
                    } else {
                      axios.post("/wishlist", {
                        userID: user,
                        productID: product._id,
                      });
                    }
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const user = auth.username;
                    const name = product.name;
                    const price = product.price;
                    axios.post("/cart", {
                      user,
                      name,
                      price,
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Store;
