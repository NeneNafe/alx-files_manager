const express = require('express');
const router = require('./routes/index');

const PORT = process.env.PORT ? process.env.PORT : 5000;

const server = express();

server.use(express.json());
server.use(router);

server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
