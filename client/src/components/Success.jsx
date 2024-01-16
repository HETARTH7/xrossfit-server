import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Success = ({ message }) => {
  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-3">
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    </div>
  );
};

export default Success;
