import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Error from "./Error";
import Success from "./Success";
import axios from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const completeOrder = async (id) => {
    try {
      const response = await axios.put(`/order/complete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.data;
        setOrders(json);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrders();
  });

  return (
    <div>
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <h2>Orders</h2>
      <ul className="list-group">
        {orders.map((order, index) => (
          <li key={index} className="list-group-item">
            {order.user}
            {order.status}
            <button onClick={() => completeOrder(order._id)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
