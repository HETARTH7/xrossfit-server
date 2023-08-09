import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Store = () => {
  const { auth } = useAuth();
  const user = auth.username;
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    axios
      .get(`/wishlist/${auth.username}`)
      .then((res) => setWishlist(res.data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Navbar />
      <h1 className="m-5">{user}'s Wishlist</h1>
      <div className="row text-center">
        {wishlist.map((item, index) => {
          return (
            <div
              key={index}
              className="card inline ms-4 mb-4"
              style={{ width: "18rem" }}
            >
              <img src={item.img} className="card-img-top" alt="" />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">₹{item.price}</p>
                </div>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                      axios.delete(`/wishlist/${item._id}`);
                    }}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                      const user = auth.username;
                      const name = item.name;
                      const price = item.price;
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
    </div>
  );
};

export default Store;
