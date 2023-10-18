import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://planner-9r9h.onrender.com/api",
});
