import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/order/pending")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-5">Track orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        axios.post(`/order/deliver/${order._id}`);
                      }}
                      className="btn btn-success"
                    >
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
