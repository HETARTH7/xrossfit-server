import axios from "axios";
import React, { useState } from "react";
import Navbar from "./Navbar";

const OrderHistory = () => {
  const user = sessionStorage.getItem("user");
  const [orders, setOrders] = useState([]);
  axios
    .get(`http://localhost:5000/order/${user}`)
    .then((res) => setOrders(res.data))
    .catch((err) => console.log(err));
  return (
    <div>
      <Navbar />
      OrderHistory
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((x, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{x.name}</td>
                <td>{x.quantity}</td>
                <td>{x.price}</td>
                <td>{x.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
