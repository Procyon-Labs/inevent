import express from 'express';
import http from 'http';
import { checkServerHealth } from './utils/health-check.util';
import { preMiddleware } from './middleware/pre.middleware';
import { socketSetup } from './configs/socket.config';
import { PORT } from './configs/constants';
import connectToMongo from './configs/database.configs';

const app = express();
preMiddleware(app);

const server = http.createServer(app);
socketSetup(server);

setInterval(checkServerHealth, 15 * 60 * 1000);

server.listen(PORT, async () => {
  await connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
