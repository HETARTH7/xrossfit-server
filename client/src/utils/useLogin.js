import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/user/login", { email, password });
      const json = await response.data;
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      json.role === "user" ? navigate("/home") : navigate("/admin");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { login, isLoading, error };
};
