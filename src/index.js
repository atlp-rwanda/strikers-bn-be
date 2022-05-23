// @ts-nocheck
const express = require('express'),
  app = express(),
  dotenv = require('dotenv'),
  cors = require('cors'),
  http = require('http'),
  { corsFunction } = require('./utils/cors');

dotenv.config({ path: '../.env' });

const swaggerUi= require('swagger-ui-express')
const swaggerDocument=require('../public/api-docs.json')

app.use(cors());
app.use(corsFunction);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8000,
  server = http
    .createServer(app)
    .listen(port, () => console.log(`Server started at port ${port}!`));
module.exports = server;