import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Your backend URL
  withCredentials: true, // Allow cookies/auth headers
});
