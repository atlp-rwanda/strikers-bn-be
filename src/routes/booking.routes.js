import express from "express";
import {
  newBooking,
  getAllBookings,
  getSpecificBooking,
  confirmBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller";
import { verifyToken } from "../middlewares/auth";
import { adminCheck } from "../middlewares/super-admin";

const router = express.Router();

/**
 * @description To submit a new booking
 * @api api/v1/bookings
 * @access Private
 * @type POST
 */
router.post("/", verifyToken, newBooking);

/**
 * @description To get a list of all roles
 * @api api/v1/bookings
 * @access Public
 * @type GET
 */
router.get("/", [verifyToken, adminCheck], getAllBookings);

/**
 * @description To get a specific booking
 * @api api/v1/bookings/:id
 * @access Public
 * @type GET
 */
router.get("/:id", verifyToken, getSpecificBooking);

/**
 * @description To assign a confirm a specific accomodation booking
 * @api api/v1/bookings/confirm/:bookingId
 * @access Public
 * @type PATCH
 */
router.patch("/confirm/:id", [verifyToken, adminCheck], confirmBooking);

/**
 * @description To delete a specific booking
 * @api api/roles/:roleId
 * @access Public
 * @type DELETE
 */
router.delete("/:roleId", verifyToken, deleteBooking);

module.exports = router;
