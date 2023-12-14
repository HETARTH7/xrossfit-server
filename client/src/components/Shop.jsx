import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product");
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img
                  src={product.productImage}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description || "No description available"}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Price:</strong> ₹{product.price}
                  </li>
                  <li className="list-group-item">
                    <strong>Category:</strong> {product.category}
                  </li>
                  <li className="list-group-item">
                    <strong>Average User Rating:</strong>{" "}
                    {product.averageUserRating || "Not rated"}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
