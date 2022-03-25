const express = require('express');
const app = express();
const port = 3333;

require('./database');
const routes = require('./routes'); 
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(routes);

const http = require('http').Server(app);

const socketIo = require('./config/io')

socketIo(http);

http.listen(port, () => console.log(`Listening on port ${port}`));