import { useState } from "react";
import { useLogin } from "../utils/useLogin";
import { Link } from "react-router-dom";
import Error from "./Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="container">
      {error && <Error message={error} />}
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5 p-3">
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: "#f8f9fa" }}
            className="border text-center mt-5 p-5 rounded-5"
          >
            <h2 className="mb-5">Log In</h2>
            <div className="form-group m-2">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group m-2">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              style={{ background: "#96f2d7" }}
              className="btn wid rounded mt-5"
              disabled={isLoading}
            >
              Log in
            </button>
            <div>
              <Link className="btn p-4" to={"/signup"}>
                Create a new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
