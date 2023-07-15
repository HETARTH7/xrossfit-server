import axios from "axios";
import React from "react";

const Payment = () => {
  const user = sessionStorage.getItem("user");
  const pay = () => {
    axios
      .post("http://localhost:5000/order", { user })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    window.location = "/shop";
  };

  return (
    <div>
      <button onClick={pay}>PAY</button>
    </div>
  );
};

export default Payment;
