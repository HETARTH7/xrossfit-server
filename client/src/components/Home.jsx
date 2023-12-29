import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";
import LinePlot from "./ExerciseLineChart";

const Home = () => {
  const { user } = useAuthContext();
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/data/${user.email}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        const aggregatedData = aggregateExerciseData(json.exerciseLog);
        setExerciseData(aggregatedData);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const aggregateExerciseData = (exerciseLog) => {
    const dateCountMap = {};
    exerciseLog.forEach((record) => {
      const date = record.date;

      if (dateCountMap[date]) {
        dateCountMap[date] += 1;
      } else {
        dateCountMap[date] = 1;
      }
    });

    const aggregatedData = Object.entries(dateCountMap).map(
      ([date, count]) => ({
        date,
        count,
      })
    );

    return aggregatedData;
  };

  return (
    <div>
      <Navbar />
      <LinePlot data={exerciseData} />
    </div>
  );
};

export default Home;
