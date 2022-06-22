import _ from "lodash";
import { Trip } from "../models";
import express from "express";
import {
  validateStatus,
  validateTripsNotifications,
} from "../validators/trip.validator";
const app = express();
app.use(express.json());

export async function addTrip(req, res) {
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
  console.log(user);
  if (validateUserInput.error) {
    return res.status(400).json(validateUserInput.error.details[0].message);
  }
  try {
    const trip = await Trip.create({
      user,
      source,
      destination,
      DateOfTravel,
      DateOfDestination,
      status,
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Trip request created successvely",
      data: trip,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
}

export async function getAllTrips(req, res) {
  try {
    const trips = await Trip.findAll();

    return res.status(200).json({
      success: true,
      status: 200,
      data: trips,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
}

export async function getOneTrip(req, res) {
  const id = req.params.id;
  try {
    const trip = await Trip.findOne({
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
    return res.status(400).json({ error: "Something went wrong" });
  }
}

export async function deleteOneTrip(req, res) {
  const id = req.params.id;
  try {
    const trip = await Trip.findOne({ where: { id } });

    await trip.destroy();

    return res.status(200).json({ message: "Trip request deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateTrip(req, res) {
  const id = req.params.id;
  const { source, destination, DateOfTravel, DateOfDestination } = req.body;
  try {
    const trip = await Trip.findOne({ where: { id } });

    trip.source = source;
    trip.destination = destination;
    trip.DateOfTravel = DateOfTravel;
    trip.DateOfDestination = DateOfDestination;

    await trip.save();

    return res.status(200).json({
      success: true,
      status: 200,
      data: trip,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
export async function changeStatus(req, res) {
  try {
    if (!validateStatus(req.body.status))
      return res.status(400).send({ message: "Invalid status" });

    const trip = await Trip.findOne({ where: { id: req.params.id } });
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
}
