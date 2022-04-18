const express = require('express');
const app = express();
const port = 3333;
var bodyParser = require('body-parser')

require('./database');
const routes = require('./routes'); 
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes);

const http = require('http').Server(app);

const socketIo = require('./config/io')

socketIo(http);

http.listen(port, () => console.log(`Listening on port ${port}`));