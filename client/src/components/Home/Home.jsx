import React, { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Home.css";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/data", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
