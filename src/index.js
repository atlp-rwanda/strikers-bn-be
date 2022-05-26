// @ts-nocheck
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import corsFunction from "./utils/cors";
import swaggerDocument from "../public/api-docs.json";

import roleRoutes from "./routes/role.routes";

const app = express();
dotenv.config({ path: "../.env" });
app.use(cors());
app.use(corsFunction);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/roles", roleRoutes);

const port = process.env.PORT || 8000,
  server = http
    .createServer(app)
    .listen(port, () => console.log(`Server started at port ${port}!`));
export default server;
