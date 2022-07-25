import express from 'express';
import {
  newCompany,
  getAllCompanies,
  getSpecificCompany,
  updateCompanyInfo,
  deleteCompany,
} from '../controllers/company.controller';
import { verifyToken } from '../middlewares/auth';
// import { adminCheck } from '../middlewares/super-admin';

const router = express.Router();

/**
 * @description To submit a new booking
 * @api api/v1/bookings
 * @access Private
 * @type POST
 */
router.post('/', verifyToken, newCompany);

/**
 * @description To get a list of all roles
 * @api api/v1/bookings
 * @access Public
 * @type GET
 */
router.get('/', getAllCompanies);

/**
 * @description To get a specific booking
 * @api api/v1/bookings/:id
 * @access Public
 * @type GET
 */
router.get('/:id', getSpecificCompany);

/**
 * @description To assign a confirm a specific accomodation booking
 * @api api/v1/bookings/confirm/:bookingId
 * @access Public
 * @type PATCH
 */
router.patch('/:id', verifyToken, updateCompanyInfo);

/**
 * @description To delete a specific booking
 * @api api/roles/:roleId
 * @access Public
 * @type DELETE
 */
router.delete('/:id', verifyToken, deleteCompany);

module.exports = router;
