import React from "react";
import { Link } from "react-router-dom";

const Back = () => {
  return (
    <div className="mt-3 ms-2">
      <Link className="link" to={"/"}>
        ← Back
      </Link>
    </div>
  );
};

export default Back;
