import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";

const Stock = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState([]);
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
  const addProduct = () => {
    const newProduct = { name, desc, price, quantity };
    axios
      .post("http://localhost:5000/stock/add", newProduct)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/stock")
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
      <AdminNav />
      <div className="container">
        <form className="exercise d-flex flex-row mb-3" onSubmit={addProduct}>
          <input
            className="p-2"
            onChange={changeName}
            placeholder="Enter Product Name"
          ></input>
          <input
            className="p-2"
            onChange={changeDesc}
            placeholder="Enter Product Description"
          ></input>
          <input
            className="p-2"
            onChange={changePrice}
            placeholder="Enter Product Price"
          ></input>
          <input
            className="p-2"
            onChange={changeQuantity}
            placeholder="Enter Quantity"
          ></input>
          <input type="submit"></input>
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
                    <td>{x.price}</td>
                    <td>{x.quantity}</td>
                    <td>
                      <button
                        onClick={() => {
                          setUp(index);
                          setUpId(x._id);
                        }}
                      >
                        UPDATE
                      </button>
                      <input
                        onClick={() => {
                          axios.post(
                            `http://localhost:5000/stock/delete/${x._id}`
                          );
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
                      <input onChange={updatePrice} required></input>
                    </td>
                    <td>
                      <input onChange={updateQuantity} required></input>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          const updateProduct = { upId, upP, upQ };
                          axios
                            .post(
                              "http://localhost:5000/stock/update",
                              updateProduct
                            )
                            .then((res) => res.data)
                            .catch((err) => console.log(err));
                          setUp(-1);
                        }}
                      >
                        UPDATE
                      </button>
                      <button
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

export default Stock;
