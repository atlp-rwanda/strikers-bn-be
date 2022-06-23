import express from 'express';
import {
  createAccommodation, getAccommodation, updateAccommodation, deleteAccommodation
} from '../controllers/accommodation.controller';
import upload from '../utils/multer';
import { travelAdmin } from '../middlewares/travel-admin';

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
router.post('/', upload.single('picture'), createAccommodation);

/**
 * @description To Create Accommodation
 * @api api/accommodation
 * @access Private
 * @type PUT
 */
router.put('/:uuid', travelAdmin, updateAccommodation);

/**
 * @description To Create Accommodation
 * @api api/accommodation
 * @access Private
 * @type DELETE
 */
router.delete('/:uuid', travelAdmin, deleteAccommodation);

module.exports = router;
