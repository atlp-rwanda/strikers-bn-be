import { Router } from 'express';

const tripRouter = Router();
// const requireLogin=require("../middlewares/auth")
const { addTrip,getAllTrips,getOneTrip,deleteOneTrip,updateTrip } = require('../controllers/UserTrip.controller');

/**
 * @description To create a new user
 * @api v1/api/trips/CreateTrip
 * @access Public
 * @type POST
 */
tripRouter.post('/CreateTrip', addTrip);

/**
 * @description To login using email and password
 * @api v1/api/trips/getAllTrips
 * @access Public
 * @type GET
 */
tripRouter.get('/getAllTrips', getAllTrips);

/**
 * @description To create a new user
 * @api v1/api/trips/trips/:uuid
 * @access Public
 * @type GET
 */
tripRouter.get('/trips/:uuid', getOneTrip);

/**
 * @description To create a new user
 * @api v1/api/trips/trips/:uuid
 * @access Public
 * @type DELETE
 */
tripRouter.delete('/trips/:uuid', deleteOneTrip);

/**
 * @description To create a new user
 * @api v1/api/trips/trips/:uuid
 * @access Public
 * @type PUT
 */
tripRouter.put('/trips/:uuid', updateTrip);

module.exports = tripRouter;
