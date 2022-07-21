import { Router } from "express";

const tripRouter = Router();
import { verifyManager, verifyToken } from "../middlewares/auth";
import { addComments, getComments, deleteComments  } from "../controllers/tripComment.controller";

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
 * @description To create a new user
 * @api v1/api/trip/create
 * @access Public
 * @type POST
 */
tripRouter.post("/create", verifyToken, addTrip);

/**
 * @description To login using email and password
 * @api v1/api/trip/all
 * @access Public
 * @type GET
 */
tripRouter.get("/all", verifyToken, getAllTrips);

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type GET
 */
tripRouter.get("/:id", verifyToken, getOneTrip);

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type DELETE
 */
tripRouter.delete("/:id", verifyToken, deleteOneTrip);

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type PUT
 */
tripRouter.put("/:id", verifyToken, updateTrip);

/**
 * @description To reject or approve trip status
 * @api api/v1/trips/status/:id
 * @access Public
 * @type PUT
 */
tripRouter.put("/status/:id", verifyToken, verifyManager, changeStatus);

//comments


tripRouter.post("/:tripId/comments", verifyToken, addComments);
tripRouter.get("/:tripId/comments", verifyToken, getComments);
tripRouter.delete("/:tripId/comments/:uuid", verifyToken, deleteComments);

module.exports = tripRouter;
