import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Recommendation = () => {
  const API_KEY = "9d858542d8msh47906ce0cf5beabp18a90fjsn7c4697be1939";
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setParts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedPart) {
      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedPart}`,
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setExercises(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [selectedPart]);

  return (
    <div>
      <Navbar />
      <div>
        <div className="text-center input-group mt-5">
          <select
            className="rounded-pill form-select"
            onChange={(e) => setSelectedPart(e.target.value)}
          >
            <option defaultValue={true}>Choose Muscle</option>
            {parts.map((x, index) => (
              <option key={index}>{x}</option>
            ))}
          </select>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
          {exercises.map((x, index) => (
            <div key={index} className="col">
              <div className="card">
                <img src={x.gifUrl} className="card-img-top" alt={x.name} />
                <div className="card-body">
                  <h5 className="card-title">{x.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
