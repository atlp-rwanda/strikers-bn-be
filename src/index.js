/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
// @ts-nocheck
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import corsFunction from "./utils/cors";
import passport from "passport";
import swaggerDocument from "../public/api-docs.json";

import { sequelize } from "./models/index";
import tripRouter from "../src/routes/trip.routes";
import feedbackRouter from "./routes/feedback.routes";
import notificationRouter from "./routes/notification.routes";
import chatRouter from "./routes/chats.routes";

import { Server } from "socket.io";
import userRouter from "./routes/user.routes";
import rolesRouter from "./routes/role.routes";
import companiesRouter from "./routes/company.routes";
import bookingsRouter from "./routes/booking.routes";
import accommodationRouter from "./routes/accommodation.routes";
import { SESSION_SECRET } from "./config/key";

const app = express();
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
dotenv.config({ path: "../.env" });
app.use(cors());
app.use(corsFunction);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/trips/", tripRouter);
app.use("/api/v1/users/", userRouter);

app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/accommodations", accommodationRouter);
app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/notifications/", notificationRouter);
app.use("/api/v1/feedback", feedbackRouter);

app.use("/api/v1/chat", chatRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/trips/", tripRouter);
app.use("/api/v1/users/", userRouter);

app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/accommodations", accommodationRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Welcome to strikers-bn-be APIs");
});
app.get("/", (req, res) => {
  console.log(`This is email ${req.session.email}`);
  res.send("Welcome to strikers-bn-be APIs");
});
const port = process.env.PORT || 8001,
  server = http.createServer(app).listen(port, async () => {
    console.log(`Server started on port ${port}!`);
    console.log("Database connected . . .");
    await sequelize.authenticate();
  });
app.use("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye");
});

module.exports = server;
