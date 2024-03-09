import axios from "axios";

let url;
if (process.env.API_URL) {
  url = process.env.API_URL;
} else {
  url = "https://xrossfit.onrender.com";
}

export default axios.create({
  baseURL: url,
});
