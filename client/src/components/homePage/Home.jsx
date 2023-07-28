import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div id="home" className="container text-center">
        <h1 className="display-1 mt-5 pt-5 mb-5 pb-5">XrossFit</h1>
        <p className="fs-3">
          A fitness tracking and equipment shopping web app. A one-stop-shop for
          fitness enthusiasts: log your workouts, discover new exercises, and
          browse and purchase fitness equipment all in one place.
        </p>
        <div className="mt-5 mb-5 pt-5">
          <button className="btn btn-outline-dark m-2">
            <Link className="nav-item nav-link" to={"/register"}>
              Get started!
            </Link>
          </button>
          <button className="btn btn-outline-dark m-2">
            <Link className="nav-item nav-link" to={"/login"}>
              Login
            </Link>
          </button>
        </div>
      </div>
      <div
        id="about"
        className="container text-center mb-5 pb-5"
        style={{ marginTop: "10rem" }}
      >
        <h1 className="display-1 mt-5 pt-5 mb-5 pb-5">ABOUT</h1>
        <p className="fs-4">
          Welcome to XrossFit, your ultimate destination for all things fitness!
          At XrossFit, we believe that fitness is more than just a physical
          activity - it's a way of life. Our website is designed to help you
          achieve your fitness goals, whether you're just starting out or you're
          an experienced fitness enthusiast. With XrossFit, you can track your
          workouts, monitor your progress, and get personalized recommendations
          for exercises and fitness equipment that best fit your needs. Our
          expert trainers are always on hand to provide guidance and support,
          and our community of fitness enthusiasts is here to help motivate and
          inspire you along the way. In addition to our tracking and
          recommendation features, XrossFit also offers a wide selection of
          high-quality fitness equipment for purchase. From weights and
          resistance bands to cardio machines and more, we've got everything you
          need to create your own home gym and take your fitness to the next
          level. At XrossFit, we're committed to helping you reach your fitness
          goals and live your best life. Join us today and start your fitness
          journey!
        </p>
      </div>
    </div>
  );
};

export default Home;
