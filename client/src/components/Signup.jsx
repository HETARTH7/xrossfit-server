import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import Error from "./Error";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  };

  return (
    <div className="container">
    {error && <Error message={error} />}
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5 p-3">
          <form
            style={{ backgroundColor: "#f8f9fa" }}
            className="border text-center mt-5 p-5 rounded-5"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-1">Sign Up</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <ul className="text-warning mt-3" style={{ fontSize: "13px" }}>
              <li>Password must contain more than 8 characters</li>
              <li>
                Password must have atlest 1 Uppercase alphabet, 1 special
                character(@,#,$,%,&,etc)
              </li>
            </ul>

            <button
              type="submit"
              style={{ background: "#96f2d7" }}
              className="btn wid rounded mt-2"
              disabled={isLoading}
            >
              Sign up
            </button>
            <div>
              <Link className="btn p-4" to={"/login"}>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
