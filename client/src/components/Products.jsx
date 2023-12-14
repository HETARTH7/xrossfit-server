import React, { useEffect, useState } from "react";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockAvailability: "",
    newProductImage: "",
    category: "",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:5000/product");
      const json = await response.json();
      setProducts(json);
    };
    getProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="stockAvailability" className="form-label">
              Stock Availability
            </label>
            <input
              type="number"
              className="form-control"
              id="stockAvailability"
              name="stockAvailability"
              value={newProduct.stockAvailability}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="newProductImage" className="form-label">
            Product Image (URL)
          </label>
          <input
            type="text"
            className="form-control"
            id="newProductImage"
            name="newProductImage"
            value={newProduct.newProductImage}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn" style={{ background: "#96f2d7" }}>
          Submit
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Availability</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stockAvailability}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="btn"
                style={{ background: "grey" }}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Product;
