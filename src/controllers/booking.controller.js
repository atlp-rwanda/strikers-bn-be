// @ts-nocheck
import _ from "lodash";
import { Booking, User } from "../models";
import { validateBookingRegistration } from "../validators/booking.validator";

export async function newBooking(req, res) {
  try {
    const newBooking = { ...req.body };

    const validateBookingInput = validateBookingRegistration(newBooking);

    if (validateBookingInput.error) {
      return res
        .status(400)
        .json(validateBookingInput.error.details[0].message);
    }

    const newBookingSaved = await Booking.create(
      _.pick(newBooking, [
        "bookingId",
        "supplierId",
        "requesterId",
        "status",
        "dateSubmitted",
      ])
    );

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

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
        0;
      }
    );
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
}

export async function confirmBooking(req, res) {
  try {
    const bookingId = req.params.id;
    let checkBooking = await Booking.findOne({
      where: { bookingId },
    });
    if (!checkBooking) {
      return res.status(404).send({
        success: false,
        message: "Booking with that id doesn't exist",
      });
    }
    const updatedBooking = await Booking.update(
      { status: "confirmed" },
      { where: { bookingId } }
    );
    checkBooking.status = "confirmed";
    return res.status(200).json({
      success: true,
      message: "This accomodation booking was successfully confirmed!",
      data: checkBooking,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}

export async function deleteBooking(req, res) {
  try {
    const { id } = req.params;
    const bookingToDelete = await Booking.findOne({ where: { bookingId: id } });
    if (!bookingToDelete) {
      return res.status(404).send({
        message: "The specified booking doesn't exist in the database",
      });
    }
    await Booking.destroy({ where: { bookingId: id } });
    res.status(200).send({
      message: `Successfully deleted that booking.`,
      deletedBooking: bookingToDelete,
    });
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
}
