import express from 'express';
import { createAccommodation, getAccommodation } from '../controllers/accommodation.controller';

const router = express.Router();

/**
 * @description To get Accommodation
 * @api api/accommodation
 * @access Private
 * @type GET
 */
router.get('/', getAccommodation);

/**
 * @description To Create Accommodation
 * @api api/accommodation
 * @access Private
 * @type POST
 */
router.post('/', createAccommodation);

module.exports = router;
