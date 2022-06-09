import { Router } from 'express';

const tripRouter = Router();
import { verifyToken } from '../middlewares/auth';
import { adminCheck } from '../middlewares/super-admin';
const { 
    addTrip,
    getAllTrips,
    getOneTrip,
    deleteOneTrip,
    updateTrip } = require('../controllers/trip.controller'); 

/**
 * @description To create a new user
 * @api v1/api/trip/create
 * @access Public
 * @type POST
 */
tripRouter.post('/create',verifyToken, addTrip);

/**
 * @description To login using email and password
 * @api v1/api/trip/all
 * @access Public
 * @type GET
 */
tripRouter.get('/all',[verifyToken, adminCheck],getAllTrips);

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type GET
 */
tripRouter.get('/:id',[verifyToken, adminCheck], getOneTrip);

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type DELETE
 */
tripRouter.delete('/:id',verifyToken, deleteOneTrip);

/**
 * @description To create a new user
 * @api v1/api/trip/:id
 * @access Public
 * @type PUT
 */
tripRouter.put('/:id',verifyToken, updateTrip);

module.exports = tripRouter;
