import axios from "axios";

export default axios.create({
  baseURL: "https://api.nasa.gov/",
  headers: {
    Authorization: process.env.REACT_APP_NASA_API_KEY
  }
});
