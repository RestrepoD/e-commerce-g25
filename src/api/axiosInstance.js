import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://store-api-service-e99f.onrender.com",
});
