import axios from "axios";

export const BOOKING_API_BASE_URL = "http://localhost:5013/api";

export const api = axios.create({
  baseURL: "http://localhost:5013/api",
  withCredentials: false,
});
