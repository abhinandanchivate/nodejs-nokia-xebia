import axios from "axios";

import config from "config";
const axiosClient = axios.create({
  baseURL: config.get("userAPI.baseURL"),
  timeout: config.get("userAPI.timeout") || 6000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default axiosClient;
