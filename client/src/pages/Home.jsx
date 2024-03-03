import React, { useEffect } from "react";
import { useAuthContext } from "../utils/useAuthContext";
import Navbar from "./Navbar";
import axios from "../api/axios";

const Home = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`/user/${user.id}`);
      const json = await response.data;
      console.log(json);
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
