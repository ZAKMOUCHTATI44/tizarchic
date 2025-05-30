import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL || "maroc.com",
  withCredentials: true,
  
  headers: {
    "x-publishable-api-key":
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
  },
});

export default axiosInstance;
