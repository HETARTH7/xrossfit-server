import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const completeOrder = async (id) => {
    const response = await fetch(`http://localhost:5000/order/complete/${id}`, {
      method: "PUT",
    });
    const json = await response.json();
    if (response.ok) console.log(json);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/order");
        const json = await response.json();
        setOrders(json);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  });

  return (
    <div>
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
