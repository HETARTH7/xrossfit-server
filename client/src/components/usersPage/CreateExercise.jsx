import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";

const CreateExercise = () => {
  const username = sessionStorage.getItem("user");
  const [exercises, setExercises] = useState([]);
  axios
    .get(`http://localhost:5000/exercise/${username}`)
    .then((res) => setExercises(res.data))
    .catch((err) => console.log(err));
  const deleteExercise = (id) => {
    axios
      .post(`http://localhost:5000/exercise/delete/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setExercises((prevValue) => {
      return prevValue.filter((index) => {
        return index._id !== id;
      });
    });
  };

  const [exerciseName, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: username,
      exerciseName: exerciseName,
      duration: duration,
      date: date,
    };
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercise/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h3 className="text-center mt-4">Add Exercises</h3>
        <br />
        <form
          onSubmit={onSubmit}
          className="exercise d-flex flex-row mb-3 text-center w-fit"
        >
          <div className="p-2">
            <label>
              <h5>EXERCISE</h5>
            </label>
            <br />
            <input
              type="text"
              required
              value={exerciseName}
              onChange={onChangeDescription}
            />
            <br />
          </div>
          <div className="p-2">
            <label>
              <h5>DURATION</h5>
            </label>
            <br />
            <input
              type="text"
              required
              value={duration}
              onChange={onChangeDuration}
            />
            <br />
          </div>
          <div className="p-2">
            <label>
              <h5>DATE</h5>
            </label>
            <div>
              <DatePicker selected={date} onChange={onChangeDate} />
            </div>
          </div>
          <div>
            <br />
            <input type="submit" value="ADD" />
            <br />
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Exercise</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{exercise.exerciseName}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.date.slice(0, 10)}</td>
                  <td>
                    <button onClick={() => deleteExercise(exercise._id)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateExercise;
