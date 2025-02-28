"use client";
import { useAuthContext } from "@/utils/useAuthContext";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import ChatSection from "./ChatSection";

const TrackingPage = () => {
  const { user } = useAuthContext();
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    calories: "",
    sets: "",
    type: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getExerciseTypes = async () => {
      try {
        const response = await axios.get("/exercise/types", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.data;
        setExerciseTypes(json.exerciseTypes);
      } catch (error) {
        if (error.response?.data) toast.error(error.response.data.message);
        else toast.error(error.message);
      }
    };

    const getExercises = async () => {
      try {
        const response = await axios.get(`/exercise/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.data;
        setExercises(json.exercises);
      } catch (error) {
        if (error.response?.data) toast.error(error.response.data.message);
        else toast.error(error.message);
      }
    };

    if (user) {
      getExerciseTypes();
      getExercises();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/exercise/add",
        {
          ...formData,
          user: user.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success(response.data.message);
      setFormData({
        name: "",
        duration: "",
        calories: "",
        sets: "",
        type: "",
        note: "",
      });

      const updatedExercises = await axios.get(`/exercise/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setExercises(updatedExercises.data.exercises);
    } catch (error) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <ChatSection />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, px: 2 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Track Your Exercise
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Exercise Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Duration (minutes)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                type="number"
                required
              />
              <TextField
                fullWidth
                label="Calories Burned"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                type="number"
                required
              />
              <TextField
                fullWidth
                label="Number of Sets"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                type="number"
                required
              />
              <TextField
                fullWidth
                select
                label="Exercise Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {exerciseTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Notes"
                name="note"
                value={formData.note}
                onChange={handleChange}
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" color="primary">
                Add Exercise
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Duration (min)</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise._id}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.duration}</TableCell>
                  <TableCell>{exercise.calories}</TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.type}</TableCell>
                  <TableCell>
                    {new Date(exercise.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{exercise.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default TrackingPage;
