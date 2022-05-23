// @ts-nocheck
const express = require('express'),
  app = express(),
  dotenv = require('dotenv'),
  cors = require('cors'),
  http = require('http'),
  { corsFunction } = require('./utils/cors');

dotenv.config({ path: '../.env' });

app.use(cors());
app.use(corsFunction);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000,
  server = http
    .createServer(app)
    .listen(port, () => console.log(`Server started at port ${port}!`));
module.exports = server;