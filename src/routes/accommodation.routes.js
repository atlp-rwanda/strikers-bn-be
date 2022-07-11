import express from 'express';
import { createAccommodation, getAccommodation,updateAccommodation } from '../controllers/accommodation.controller';
import upload from '../utils/multer';
import { travelAdmin } from '../middlewares/travel-admin';
import { verifyToken } from '../middlewares/auth';
import { rateAccommodation } from '../controllers/ratingAccomodation.controller';

const router = express.Router();

/**
 * @description To get Accommodation
 * @api api/accommodation
 * @access Private
 * @type GET
 */
router.get('/', travelAdmin, getAccommodation);

/**
 * @description To Create Accommodation
 * @api api/accommodation
 * @access Private
 * @type POST
 */
router.post('/', travelAdmin, upload.single('picture'), createAccommodation);

/**
 * @description To Create Accommodation
 * @api api/accommodation
 * @access Private
 * @type PUT
 */
router.put('/', updateAccommodation);


router.post('/:uuid/rate',verifyToken, rateAccommodation);

module.exports = router;
