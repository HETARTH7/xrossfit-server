import axios from "axios";

let url;
if (process.env.API_URL) {
  url = process.env.API_URL;
} else {
  url = "http://localhost:5000";
}

export default axios.create({
  baseURL: url,
});
