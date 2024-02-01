import axios from "axios";
export const devURL = "http://localhost:3000";

// export const prodURL = "https://cypherscan-backend.onrender.com";
export const prodURL = ""; // Render Server URL

// Axios Instance - Specify the server to be used.
export const axiosInstance = axios.create({
  baseURL: `${prodURL}/api/v1`,
});
