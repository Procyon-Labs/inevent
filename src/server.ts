import express from 'express';
import http from 'http';
import { preMiddleware } from './middleware/pre.middleware';
import { socketSetup } from './configs/socket.config';
import { PORT } from './configs/constants';
import connectToMongo from './configs/database.configs';

import axios from "axios";

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
const interval = 8 * 60 * 1000;
setInterval(checkServerHealth, interval);

checkServerHealth();

server.listen(PORT, async () => {
  await connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
