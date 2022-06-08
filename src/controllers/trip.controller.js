import _ from "lodash";
<<<<<<< HEAD
import express from "express";
import { Trip } from "../models";
import { validateTripsNotifications } from "../validators/trip.validator";

const app = express();
app.use(express.json());

export async function addTrip(req, res) {
  const user = req.userId;
=======
import { Trip } from "../models";
const express = require("express");
import { validateTripsNotifications } from "../validators/trip.validator";
const app = express();
app.use(express.json());

exports.addTrip = async (req, res) => {
  const user = 1;
>>>>>>> b5bb8a8 (smoe changes)
  const { source, destination, DateOfTravel, DateOfDestination, status } =
    req.body;
  const validateUserInput = validateTripsNotifications({
    source,
    destination,
    DateOfTravel,
    DateOfDestination,
    status,
  });
<<<<<<< HEAD
=======

>>>>>>> b5bb8a8 (smoe changes)
  if (validateUserInput.error) {
    return res.status(400).json(validateUserInput.error.details[0].message);
  }
  try {
    const trip = await Trip.create({
      user,
      source,
<<<<<<< HEAD
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
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
}
=======
      Destination,
      DateOfTravel,
      DateOfDestination,
    });

    return res.json(trip);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
>>>>>>> b5bb8a8 (smoe changes)

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();

<<<<<<< HEAD
    return res.status(201).json({
      success: true,
      status: 200,
      data: trips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.toString() });
=======
    return res.json(trips);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
>>>>>>> b5bb8a8 (smoe changes)
  }
};

exports.getOneTrip = async (req, res) => {
<<<<<<< HEAD
  const id = req.params.id;
  try {
    const trip = await Trip.findOne({
      where: { id },
      // include: 'id',
    });

    return res.status(201).json({
      success: true,
      status: 200,
      data: trip,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: error.toString() });
=======
  const uuid = req.params.uuid;
  try {
    const trip = await Trip.findOne({
      where: { uuid },
      include: "trip",
    });

    return res.json(trip);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
>>>>>>> b5bb8a8 (smoe changes)
  }
};

exports.deleteOneTrip = async (req, res) => {
<<<<<<< HEAD
  const id = req.params.id;
  try {
    const trip = await Trip.findOne({ where: { id } });

    await trip.destroy();

    return res.json({ message: "Trip request deleted!" });
=======
  const uuid = req.params.uuid;
  try {
    const trip = await Trip.findOne({ where: { uuid } });

    await trip.destroy();

    return res.json({ message: "User deleted!" });
>>>>>>> b5bb8a8 (smoe changes)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateTrip = async (req, res) => {
<<<<<<< HEAD
  const id = req.params.id;
  const { source, destination, DateOfTravel, DateOfDestination } = req.body;
  try {
    const trip = await Trip.findOne({ where: { id } });

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
=======
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const trip = await User.findOne({ where: { uuid } });

    trip.name = source;
    trip.name = destination;
    trip.email = DateOfTravel;
    trip.role = DateOfDestination;

    await trip.save();

    return res.json(trip);
>>>>>>> b5bb8a8 (smoe changes)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
<<<<<<< HEAD

exports.changeStatus = async (req, res) => {
  try {
    const trip = await Trip.findOne({ where: { id: req.params.id } });
    trip.status = req.body.status;
    await trip.save();
    return res.status(201).json({
      success: true,
      status: 200,
      data: trip,
      message: "Status Updated",
    });
  } catch (err) {
    return res.status(404).send({ error: err.toString() });
  }
};
=======
>>>>>>> b5bb8a8 (smoe changes)
