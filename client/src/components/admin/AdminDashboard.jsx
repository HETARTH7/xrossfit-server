import React, { useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";

const AdminDashboard = () => {
  const [order, setOrder] = useState([]);
  const [pending, setPending] = useState([]);
  var c = 0;
  var C = 0;
  axios
    .get("http://localhost:5000/order")
    .then((res) => setOrder(res.data))
    .catch((err) => console.log(err));

  axios
    .get("http://localhost:5000/order/pending")
    .then((res) => setPending(res.data))
    .catch((err) => console.log(err));

  order.forEach(() => {
    c++;
  });

  pending.forEach(() => {
    C++;
  });
  return (
    <div>
      <AdminNav />
      <h1>Total sales / orders</h1>
      <p>{c}</p>
      <h1>Pending Orders</h1>
      <p>{C}</p>
    </div>
  );
};

export default AdminDashboard;
