import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Tracker = () => {
  const { auth } = useAuth();
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    axios
      .get(`/log/${auth.username}`)
      .then((res) => setExercises(res.data))
      .catch((err) => console.log(err));
  }, []);
  const deleteExercise = (id) => {
    axios
      .delete(`/log/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setExercises((prevValue) => {
      return prevValue.filter((index) => {
        return index._id !== id;
      });
    });
  };

  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  const onChangeExercise = (e) => {
    setExercise(e.target.value);
  };
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newExercise = {
      username: auth.username,
      exercise: exercise,
      duration: duration,
      date: date,
    };
    axios
      .post("/log", newExercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setExercise("");
    setDuration("");
    setDate("");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h3 className="">Add Exercises</h3>
        <br />
        <form onSubmit={onSubmit}>
          <input
            className="form-control mb-4"
            placeholder="Enter Exercise"
            type="text"
            required
            value={exercise}
            onChange={onChangeExercise}
          />

          <input
            className="form-control mb-4"
            placeholder="Enter duration"
            type="text"
            required
            value={duration}
            onChange={onChangeDuration}
          />

          <div>
            <DatePicker
              className="form-control mb-4"
              placeholder="Enter"
              selected={date}
              onChange={onChangeDate}
            />
            <input
              className="btn btn-outline-success ms-5"
              type="submit"
              value="ADD"
            />
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
                  <td>{exercise.exercise}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.date.slice(0, 10)}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteExercise(exercise._id)}
                    >
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

export default Tracker;
