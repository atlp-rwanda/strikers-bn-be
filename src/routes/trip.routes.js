<<<<<<< HEAD
import { Router } from "express";

const tripRouter = Router();
import { verifyManager, verifyToken } from "../middlewares/auth";
import { addComments, getComments, deleteComments  } from "../controllers/tripComment.controller";

import { adminCheck } from "../middlewares/super-admin";
=======
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { adminCheck } from '../middlewares/super-admin';

const tripRouter = Router();
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201
const {
  addTrip,
  getAllTrips,
  getOneTrip,
  deleteOneTrip,
<<<<<<< HEAD
  updateTrip,
  changeStatus,
} = require("../controllers/trip.controller");
=======
  updateTrip
} = require('../controllers/trip.controller');
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201

/**
 * @description To create a new user
 * @api v1/api/trip/create
 * @access Public
 * @type POST
 */
<<<<<<< HEAD
tripRouter.post("/create", verifyToken, addTrip);
=======
tripRouter.post('/create', verifyToken, addTrip);
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201

/**
 * @description To login using email and password
 * @api v1/api/trip/all
 * @access Public
 * @type GET
 */
<<<<<<< HEAD
tripRouter.get("/all", verifyToken, getAllTrips);
=======

tripRouter.get('/all', [verifyToken, adminCheck], getAllTrips);
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type GET
 */
<<<<<<< HEAD
tripRouter.get("/:id", verifyToken, getOneTrip);
=======
tripRouter.get('/:id', [verifyToken, adminCheck], getOneTrip);
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type DELETE
 */
<<<<<<< HEAD
tripRouter.delete("/:id", verifyToken, deleteOneTrip);
=======
tripRouter.delete('/:id', verifyToken, deleteOneTrip);
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type PUT
 */
<<<<<<< HEAD
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
=======
tripRouter.put('/:id', verifyToken, updateTrip);
>>>>>>> e29ef90782b2ae4c85a0f111de1e6dd181fba201

module.exports = tripRouter;
