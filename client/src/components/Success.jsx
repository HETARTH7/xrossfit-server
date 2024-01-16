import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Success = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    showMessage && (
      <div className="position-fixed top-0 start-50 translate-middle-x mt-3">
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      </div>
    )
  );
};

export default Success;
