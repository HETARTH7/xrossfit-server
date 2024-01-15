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

    const response = await axios.post("/signup", { name, email, password });
    const json = await response.data;

    if (response.status === 400) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/home");
    }
  };

  return { signup, isLoading, error };
};
