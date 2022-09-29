import axios from "axios";

const baseURL = "https://localhost:7290/api/";

const api = axios.create({
  baseURL: `${baseURL}`,
});

export default api;
