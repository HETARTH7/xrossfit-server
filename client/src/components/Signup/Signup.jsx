import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
    if (!error) navigate("/home");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5 p-3">
          <form
            style={{ backgroundColor: "#f8f9fa" }}
            className="border text-center mt-5 p-5 rounded-5"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-5">Sign Up</h2>
            <div className="form-group m-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
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
              Sign up
            </button>
            <div>
              <Link className="btn p-4" to={"/login"}>
                Already have an account?
              </Link>
            </div>
            {error && <div className="text-danger error mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
