// @ts-nocheck
const express = require('express'),
  app = express(),
  cors = require('cors'),
  { corsFunction } = require('./utils/cors'),
  dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

app.use(cors());
app.use(corsFunction);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000,
  server = require('http')
    .createServer(app)
    .listen(port, () => console.log(`Server started at port ${port}!`));

module.exports = server;
