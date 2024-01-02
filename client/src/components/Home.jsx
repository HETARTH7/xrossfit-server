import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

const Home = () => {
  const { user } = useAuthContext();
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/data/${user.email}`, {
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
