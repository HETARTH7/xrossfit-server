import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken.js";

const RequireAuth = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  if (!auth.username) {
    if (localStorage["isLoggedIn"]) refresh();
    else navigate("/login");
  }
};

export default RequireAuth;
