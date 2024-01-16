import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios";
import Error from "./Error";
import Success from "./Success";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ExerciseLogForm = () => {
  const { user } = useAuthContext();
  const [logs, setLogs] = useState([]);
  const date = new Date();
  const today = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [exerciseLog, setExerciseLog] = useState({
    exerciseName: "",
    duration: null,
    sets: null,
    repetitions: null,
    caloricBurn: null,
    notes: "-",
    date: today + " " + months[parseInt(month)] + " " + year,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseLog((prevExerciseLog) => ({
      ...prevExerciseLog,
      [name]: value,
    }));
  };

  const fetchLog = useCallback(async () => {
    try {
      const response = await axios.get(`/log/${user.email}`);
      const json = await response.data;

      if (response.status === 200) setLogs(json);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError(error.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchLog();
    }
  }, [fetchLog, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(exerciseLog);

    try {
      const response = await axios.post("/log", {
        user: user.email,
        exerciseLog,
      });
      setSuccess(response.data);
      setError(null);
      fetchLog();
      reset();
    } catch (error) {
      setSuccess(null);
      setError(error.message);
    }
  };

  const reset = () => {
    setExerciseLog({
      exerciseName: "",
      duration: null,
      sets: null,
      repetitions: null,
      caloricBurn: null,
      notes: "",
    });
  };

  const deleteLog = async (id) => {
    try {
      const response = await axios.delete(`/log/${id}`);
      const json = await response.data;

      setSuccess(json);
      fetchLog();
    } catch (error) {
      setSuccess(null);
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3 row">
          <label htmlFor="exerciseName" className="col-sm-2 col-form-label">
            Exercise Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="exerciseName"
              name="exerciseName"
              value={exerciseLog.exerciseName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="duration" className="col-sm-2 col-form-label">
            Duration (minutes)
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              value={exerciseLog.duration || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="sets" className="col-sm-2 col-form-label">
            Sets
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="sets"
              name="sets"
              value={exerciseLog.sets || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="repetitions" className="col-sm-2 col-form-label">
            Repetitions
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="repetitions"
              name="repetitions"
              value={exerciseLog.repetitions || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="caloricBurn" className="col-sm-2 col-form-label">
            Caloric Burn
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="caloricBurn"
              name="caloricBurn"
              value={exerciseLog.caloricBurn || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="notes" className="col-sm-2 col-form-label">
            Notes
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              rows="3"
              id="notes"
              name="notes"
              value={exerciseLog.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-grid">
          <button
            type="submit"
            style={{ background: "#96f2d7" }}
            className="btn rounded"
          >
            Add
          </button>
        </div>
        <div className="d-grid mt-2">
          <button onClick={reset} className="btn rounded">
            Reset
          </button>
        </div>
      </form>
      <div className="container mt-5">
        <table className="table">
          <tbody>
            {logs.map((log, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{log.exerciseName}</td>
                  <td>{log.duration} mins</td>
                  <td>{log.sets} sets</td>
                  <td>{log.repetitions} x</td>
                  <td>{log.caloricBurn} calories burnt</td>
                  <td>{log.notes}</td>
                  <td>{log.date}</td>
                  <td>
                    <button
                      onClick={() => deleteLog(log._id)}
                      className="bg-success ps-2 pe-2 rounded"
                    >
                      X
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

export default ExerciseLogForm;
