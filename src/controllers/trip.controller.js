import _ from "lodash";
import { TripRequest } from "../models";
import {
  validateStatus,
  validateTripsNotifications,
} from "../validators/trip.validator";

exports.addTrip = async (req, res) => {
  const user = req.userId;
  const { source, destination, DateOfTravel, DateOfDestination, status } =
    req.body;
  const validateUserInput = validateTripsNotifications({
    source,
    destination,
    DateOfTravel,
    DateOfDestination,
    status,
  });
  if (validateUserInput.error) {
    return res.status(400).json(validateUserInput.error.details[0].message);
  }
  try {
    const trip = await TripRequest.create({
      user,
      source,
      destination,
      DateOfTravel,
      DateOfDestination,
      status,
    });

    return res.status(201).json({
      message: "Trip request created successvely",
      data: trip,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await TripRequest.findAll();

    return res.status(200).json({
      data: trips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.toString() });
  }
};

exports.getOneTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const trip = await TripRequest.findOne({
      where: { id },
      // include: 'id',
    });

    return res.status(200).json({
      success: true,
      status: 200,
      data: trip,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: error.toString() });
  }
};

exports.deleteOneTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const trip = await TripRequest.findOne({ where: { id } });

    await trip.destroy();

    return res.json({ message: "Trip request deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateTrip = async (req, res) => {
  const id = req.params.id;
  const { source, destination, DateOfTravel, DateOfDestination } = req.body;
  try {
    const trip = await TripRequest.findOne({ where: { id } });

    if (source) trip.source = source;
    if (destination) trip.destination = destination;
    if (DateOfTravel) trip.DateOfTravel = DateOfTravel;
    if (DateOfDestination) trip.DateOfDestination = DateOfDestination;

    await trip.save();

    return res.status(201).json({
      success: true,
      status: 200,
      data: trip,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    if (!validateStatus(req.body.status))
      return res.status(400).send({ message: "Invalid status" });

    const trip = await TripRequest.findOne({ where: { id: req.params.id } });
    trip.status = req.body.status;
    await trip.save();
    return res.status(200).send({
      data: trip,
      message: `Trip request ${
        trip.status === "approved" ? "approved" : "rejected"
      }`,
    });
  } catch (err) {
    return res.status(404).send({ error: err.toString() });
  }
};
