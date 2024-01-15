import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Root = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/home");

    const fetchQuote = async () => {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=fitness",
        { headers: { "X-Api-Key": "oJbcw7kiaA43VS3s9GgOWw==Bs5U6TODXVKbUqyH" } }
      );
      const json = await response.json();
      setQuote(json[0].quote);
      setAuthor(json[0].author);
    };
    fetchQuote();
  }, [navigate]);
  return (
    <div>
      <div className="text-center">
        <h1 className="title fw-bold">Xrossfit</h1>
        <p className="pb-5 fs-3">
          Track daily exercises. Shop fitness equipment. Get personalized
          exercise recommendations. Chat with other fitness enthusiasts
        </p>

        <Link
          style={{ background: "#96f2d7" }}
          className="btn fs-4 rounded-pill"
          to="/login"
        >
          Login
        </Link>
        <Link className="button btn fs-4" to="/signup">
          Signup
        </Link>
        <p className="fst-italic blockquote mt-5 text-success">{quote}</p>
        <p className="blockquote-footer">{author}</p>
      </div>
    </div>
  );
};

export default Root;
