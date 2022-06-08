import { Router } from "express";

const tripRouter = Router();
import { verifyManager, verifyToken } from "../middlewares/auth";
import { adminCheck } from "../middlewares/super-admin";
const {
  addTrip,
  getAllTrips,
  getOneTrip,
  deleteOneTrip,
  updateTrip,
  changeStatus,
} = require("../controllers/trip.controller");

/**
 * @description To create a new trip
 * @api api/v1/trips/create
 * @access Public
 * @type POST
 */
tripRouter.post("/create", verifyToken, addTrip);

/**
 * @description To login using email and password
 * @api api/v1/trips/all
 * @access Public
 * @type GET
 */
tripRouter.get("/all", getAllTrips);

/**
 * @description To get all trips
 * @api api/v1/trips/trips/:id
 * @access Public
 * @type GET
 */
tripRouter.get("/trip/:id", [verifyToken, adminCheck], getOneTrip);

/**
 * @description To remove trip
 * @api api/v1/trips/:id
 * @access Public
 * @type DELETE
 */
tripRouter.delete("/:id", verifyToken, deleteOneTrip);

/**
 * @description To update trip
 * @api api/v1/trips/update/:id
 * @access Public
 * @type PUT
 */
tripRouter.put("/update/:id", verifyToken, updateTrip);

/**
 * @description To reject or approve trip status
 * @api api/v1/trips/status/:id
 * @access Public
 * @type PUT
 */
tripRouter.put("/status/:id", verifyToken, verifyManager, changeStatus);

module.exports = tripRouter;
