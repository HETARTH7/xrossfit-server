import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Shop = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    axios
      .get("/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
    axios
      .get("/wishlist", { userID: auth.username })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="row">
      <Navbar />

      {products.map((product, index) => {
        var isWishlisted = wishlist.includes(product._id);
        return (
          <div
            key={index}
            className="card inline ms-4 mb-4"
            style={{ width: "18rem" }}
          >
            <img src={product.img} className="card-img-top" alt="" />
            <div className="card-body text-center">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">₹{product.price}</p>
              <div>
                <img
                  src={isWishlisted ? "/wishlisted.svg" : "/wishlist.svg"}
                  alt=""
                  style={{ width: "2rem", marginRight: "2rem" }}
                />
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shop;
