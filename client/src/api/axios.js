import axios from "axios";

const user = localStorage.getItem("user");
const token = JSON.parse(user).token;

export default axios.create({
  headers: { Authorization: `Bearer ${token}` },
  baseURL: "http://localhost:5000",
});
