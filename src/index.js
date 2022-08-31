/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
// @ts-nocheck
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
// const session = require('express-session');
import corsFunction from './utils/cors';
import swaggerDocument from '../public/api-docs.json';

import { sequelize } from "./models/index";
import tripRouter from "../src/routes/trip.routes";
import userRouter from "../src/routes/user.routes";
import rolesRouter from "../src/routes/role.routes";
import feedbackRouter from './routes/feedback.routes';
import companiesRouter from './routes/company.routes';
import bookingsRouter from './routes/booking.routes';
import accommodationRouter from './routes/accommodation.routes';
import notificationRouter from './routes/notification.routes'

import chatRouter from './routes/chats.routes';
 
import { Server } from 'socket.io';
const app = express();
dotenv.config({ path: '../.env' });
app.use(cors());
app.use(corsFunction);
app.use(session({
  secret: 'barefoot'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/trips/', tripRouter);
app.use('/api/v1/users/', userRouter);


app.use('/api/v1/roles', rolesRouter);
app.use('/api/v1/accommodations', accommodationRouter);
app.use('/api/v1/companies', companiesRouter);
app.use('/api/v1/bookings', bookingsRouter);
app.use('/api/v1/notifications/', notificationRouter)
app.use('/api/v1/feedback', feedbackRouter);

app.use('/api/v1/chat',chatRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  console.log(`This is email ${req.session.email}`);
  res.send('Welcome to strikers-bn-be APIs');
});
app.get('/', (req, res) => {
  console.log(`This is email ${req.session.email}`);
  res.send('Welcome to strikers-bn-be APIs');
});
const port = process.env.PORT || 8001,
  server = http.createServer(app).listen(port, async () => {
    console.log(`Server started on port ${port}!`);
    console.log('Database connected . . .');
  });
const io = new Server(server,{
  cors: {
    origin: "*", 
  },
});

let onlineUsers = [];

const addNewUser = (username,pic, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username,pic, socketId });
    console.log("Hello BOss",username);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {  
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (pic,username) => {
    console.log(pic)
    console.log(username)
    addNewUser(pic,username, socket.id); 
    console.log(socket.id)
  });

  socket.on("sendNotification", ({senderName, type,receiverName }) => {
    const receiver = getUser(receiverName);
    const sender = getUser(senderName);
    console.log("receiver ",receiver)
      console.log(senderName);
      console.log(type);
    let p =sender?.pic;
    io.to(receiver?.socketId).emit("getNotification", {
      senderName,
      p,
      type,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});


module.exports = server;
