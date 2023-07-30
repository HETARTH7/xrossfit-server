import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../../api/axios";

const Product = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState([]);
  const [img, setImg] = useState("");
  const [up, setUp] = useState(-1);
  const [upP, setUpP] = useState("");
  const [upQ, setUpQ] = useState("");
  const [upId, setUpId] = useState();

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeDesc = (e) => {
    setDesc(e.target.value);
  };
  const changePrice = (e) => {
    setPrice(e.target.value);
  };
  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const changeImg = (e) => {
    setImg(e.target.value);
  };
  const addProduct = () => {
    const newProduct = { name, desc, price, quantity, img };
    axios
      .post("/product", newProduct)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("/product")
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  });

  const updatePrice = (e) => {
    setUpP(e.target.value);
  };
  const updateQuantity = (e) => {
    setUpQ(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <form className="exercise d-flex flex-row mb-3" onSubmit={addProduct}>
          <input
            className="form-control m-4"
            onChange={changeName}
            placeholder="Enter Product Name"
          ></input>
          <input
            className="form-control m-4"
            onChange={changeDesc}
            placeholder="Enter Product Description"
          ></input>
          <input
            className="form-control m-4"
            onChange={changePrice}
            placeholder="Enter Product Price"
          ></input>
          <input
            className="form-control m-4"
            onChange={changeQuantity}
            placeholder="Enter Quantity"
          ></input>
          <input
            className="form-control m-4"
            onChange={changeImg}
            placeholder="Enter Image URL"
          ></input>
          <div>
            <input
              className="form-control btn btn-success m-4"
              style={{ height: "3rem", width: "5rem" }}
              type="submit"
            ></input>
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {product.map((x, index) => {
              if (up !== index) {
                return (
                  <tr key={index}>
                    <td>{x.name}</td>
                    <td>{x.description}</td>
                    <td>₹{x.price}</td>
                    <td>{x.quantity}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning mb-2"
                        onClick={() => {
                          setUp(index);
                          setUpId(x._id);
                        }}
                      >
                        UPDATE
                      </button>
                      <input
                        className="btn btn-outline-danger"
                        onClick={() => {
                          axios.delete(`/product/${x._id}`);
                        }}
                        type="submit"
                        value="DELETE"
                      ></input>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <td>{x.name}</td>
                    <td>{x.description}</td>
                    <td>
                      <input
                        className="form-control"
                        onChange={updatePrice}
                        required
                      ></input>
                    </td>
                    <td>
                      <input
                        className="form-control"
                        onChange={updateQuantity}
                        required
                      ></input>
                    </td>
                    <td>
                      <button
                        className="btn btn-success mb-2"
                        onClick={() => {
                          const updateProduct = { upId, upP, upQ };
                          axios
                            .put("/product", updateProduct)
                            .then((res) => res.data)
                            .catch((err) => console.log(err));
                          setUp(-1);
                        }}
                      >
                        UPDATE
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setUp(-1);
                        }}
                      >
                        CANCEL
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
