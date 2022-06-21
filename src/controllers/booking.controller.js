// @ts-nocheck
import _ from "lodash";
import { Booking, User } from "../models";
import { validateBookingRegistration } from "../validators/booking.validator";

export async function newBooking(req, res) {}

export async function getAllBookings(req, res) {
  try {
    await Booking.findAll().then((bookings) => res.status(200).json(bookings));
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function getSpecificBooking(req, res) {
  try {
    await Booking.findOne({ where: { bookingId: req.params.id } }).then(
      (booking) => {
        if (booking) res.status(200).json(booking);
        else
          res
            .status(404)
            .send({ message: "Booking with that id doesn't exist" });
      }
    );
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function confirmBooking(req, res) {}

export async function updateBooking(req, res) {}

export async function deleteBooking(req, res) {}
