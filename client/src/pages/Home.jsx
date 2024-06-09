import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Xrossfit</h1>
        <div className="row mt-4">
          <Link to={"/track"} className="col-12 mb-3 text-decoration-none">
            <div className="card" style={{ backgroundColor: "#f8d7da" }}>
              <div className="card-body">
                <h5 className="card-title">Track your progress</h5>
                <p className="card-text">
                  Monitor your fitness journey with our tracking tools.
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/recommend"} className="col-12 mb-3 text-decoration-none">
            <div className="card" style={{ backgroundColor: "#d4edda" }}>
              <div className="card-body">
                <h5 className="card-title">Get exercise recommendations</h5>
                <p className="card-text">
                  Personalized exercise plans to help you reach your goals.
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/shop"} className="col-12 mb-3 text-decoration-none">
            <div className="card" style={{ backgroundColor: "#d1ecf1" }}>
              <div className="card-body">
                <h5 className="card-title">Shop exercise equipments</h5>
                <p className="card-text">
                  Find the best equipment for your home workouts.
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/chat"} className="col-12 mb-3 text-decoration-none">
            <div className="card" style={{ backgroundColor: "#fff3cd" }}>
              <div className="card-body">
                <h5 className="card-title">Chat with other users</h5>
                <p className="card-text">
                  Connect with the community and share tips.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
