import axios from "axios";
import { PORT } from "../configs/constants";

// Health check function
export function checkServerHealth() {
  axios
    .get(`https://inevent.onrender.com/health`)
    .then((response) => {
      console.log("Server health check:", response.data);
    })
    .catch((error) => {
      console.error("Server health check failed:", error.message);
    });
}
