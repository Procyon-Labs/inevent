import express from "express";
import http from "http";
import axios from "axios";
import { preMiddleware } from "./middleware/pre.middleware";
import { socketSetup } from "./configs/socket.config";
import { PORT } from "./configs/constants";

const app = express();
preMiddleware(app);

const server = http.createServer(app);
const serverUrl = `https://inevent.onrender.com`;

socketSetup(server);
const checkServerHealth = () => {
  axios
    .get(serverUrl)
    .then((response) => {
      console.log(`Server is healthy`, response.data);
    })
    .catch((error) => {
      console.error(`Error checking server health:`, error.message);
    });
};
const interval = 2 * 60 * 1000;
setInterval(checkServerHealth, interval);

checkServerHealth();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
