// @ts-nocheck
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import corsFunction from "./utils/cors";
import swaggerDocument from "../public/api-docs.json";

import { sequelize } from "./models";

import userRouter from "../src/routes/user.routes";
import rolesRouter from "../src/routes/role.routes";

const app = express();
dotenv.config({ path: "../.env" });
app.use(cors());
app.use(corsFunction);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user/", userRouter);
app.use("/api/roles/", rolesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Welcome to strikers-bn-be APIs");
});

app.get("/", (req, res) => {
  res.send("Welcome to strikers-bn-be APIs");
});
const port = process.env.PORT || 8001,
  server = http.createServer(app).listen(port, async () => {
    console.log(`Server started on port ${port}!`);
    await sequelize.authenticate();
    console.log("Database connected . . .");
  });

module.exports = server;
