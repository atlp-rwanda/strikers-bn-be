const express = require('express');
const { createAccommodation, getAccommodation } = require('../controllers/accommodation.controller');
const upload = require('../utils/multer');
const { travelAdmin } = require('../middlewares/travel-admin');

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

module.exports = router;
