import React from "react";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div>
      <p className="footer">&copy; {currentYear} Hetarth </p>
    </div>
  );
};

export default Footer;
