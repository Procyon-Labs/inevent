// src/utils/health-check.util.ts
import axios from "axios";

export function checkServerHealth() {
  axios
    .get("http://localhost:5500/health")
    .then((response) => {
      console.log("Server health check:", response.data);
    })
    .catch((error) => {
      console.error("Server health check failed:", error.message);
    });
}
