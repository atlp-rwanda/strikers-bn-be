import express from 'express';
import {
  createAccommodation, getAccommodation, updateAccommodation, deleteAccommodation, likeOrUnlikeAccommodation
} from '../controllers/accommodation.controller';
import upload from '../utils/multer';
import { travelAdmin } from '../middlewares/travel-admin';
import { verifyToken } from '../middlewares/auth';

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
router.post('/', travelAdmin, upload.single('picture'), createAccommodation);

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

/**
 * @description To like & unlike an accommodation
 * @api api/accommodation
 * @access Private
 * @type POST
 */
router.post('/:accomodationId/like', verifyToken, likeOrUnlikeAccommodation);

module.exports = router;
