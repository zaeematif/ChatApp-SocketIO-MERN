import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? "http://localhost:3000/api" : "/api", // Your backend URL
  withCredentials: true, // Allow cookies/auth headers
});
