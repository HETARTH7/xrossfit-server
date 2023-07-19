import React, { useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
const Orders = () => {
  const [order, setOrder] = useState([]);
  axios
    .get("http://localhost:5000/order/pending")
    .then((res) => setOrder(res.data))
    .catch((err) => console.log(err));

  const deliver = (e) => {
    const id = e.target.value;
    axios
      .post(`http://localhost:5000/order/deliver/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AdminNav />
      <div className="container">
        <h1>Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.map((x, index) => {
              return (
                <tr key={index}>
                  <td>{x.user}</td>
                  <td>{x.name}</td>
                  <td>{x.quantity}</td>
                  <td>{x.price}</td>
                  <td>
                    <button onClick={deliver} value={x._id}>
                      Delivered
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
