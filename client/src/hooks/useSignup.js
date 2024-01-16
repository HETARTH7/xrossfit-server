import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/signup", { name, email, password });
      const json = await response.data;

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { signup, isLoading, error };
};
