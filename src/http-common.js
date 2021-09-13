import axios from "axios";

export default axios.create({
  baseURL: "http://52.86.154.61:8080",
  headers: {
    "Content-type": "application/json"
  }
});