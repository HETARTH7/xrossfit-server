import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Error = ({ message }) => {
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
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      </div>
    )
  );
};

export default Error;
