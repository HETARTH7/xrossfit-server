import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";

const ExerciseLogForm = () => {
  const { user } = useAuthContext();
  const [logs, setLogs] = useState([]);
  const [exerciseLog, setExerciseLog] = useState({
    exerciseName: "",
    duration: null,
    sets: null,
    repetitions: null,
    caloricBurn: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseLog((prevExerciseLog) => ({
      ...prevExerciseLog,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchLog = async () => {
      const response = await fetch(`http://localhost:5000/log/${user.email}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setLogs(json);
      }
    };

    if (user) {
      fetchLog();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/log", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user.email, exerciseLog }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
    reset();
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
    const response = await fetch(`http://localhost:5000/log/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  return (
    <div>
      <Navbar />
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
                  <td>{log.duration}</td>
                  <td>{log.sets}</td>
                  <td>{log.repetitions}</td>
                  <td>{log.caloricBurn}</td>
                  <td>{log.notes}</td>
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
