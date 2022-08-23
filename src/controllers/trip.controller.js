import _ from "lodash";
import express from "express";
import { Trip, Notifications, User } from "../models";
import {
  validateStatus,
  validateTripsNotifications,
} from "../validators/trip.validator";
import { sendEmail } from "../utils/emailConfig";
import { Server } from "socket.io";
const io = new Server(4400, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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

    let requester = await User.findOne({ where: { uuid: user } });
    let lineManager = requester.lineManager;
    //send notification via email
    const emailTitle = `${requester.firstName} requested a trip to ${destination}`;
    const emailDescription = `<h1>Strikers-BN-BE Notifications</h1><p> ${requester.firstName} requested a trip to ${destination} from ${source} the date of travel is ${DateOfTravel} and date of destiination is ${DateOfDestination}</p>
    ` ;

    let manager = await User.findOne({ where: { uuid: lineManager } });
    let emailTo = manager.email;

    let checkSendEmail = await sendEmail(emailTo, emailTitle, emailDescription);

    console.log(checkSendEmail);

    //send notification to line manager

    //  let notification= await new Notifications({
    //     title: `${requester.firstName} requested a trip to ${destination}`,
    //     description: `${requester.firstName} requested a trip to ${destination} from ${source} the date pf travel is ${DateOfTravel} and date of destiination is ${DateOfDestination}`,
    //     to:lineManager
    //   })

    //   socket.on('sendNotification',notification=>{
    //     io.emit('getNotification',notification)
    //   })

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
  const { id } = req.params;
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
  const { id } = req.params;
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
  const { id } = req.params;
  const { source, destination, DateOfTravel, DateOfDestination } = req.body;
  try {
    const trip = await Trip.findOne({ where: { id } });

    trip.source = source;
    trip.destination = destination;
    trip.DateOfTravel = DateOfTravel;
    trip.DateOfDestination = DateOfDestination;

    await trip.save();

    const userId = req.userId;

    let requester = await User.findOne({ where: { uuid: userId } });
    const lineManager = requester.lineManager;

    const emailTitle = `${requester.firstName} edited the request for a travel to ${trip.destination}`;
    const emailDescription = `<h1>Strikers-BN-BE Notifications</h1><p> ${requester.firstName} requested a trip to ${destination} from ${source} the date of travel is ${DateOfTravel} and date of destiination is ${DateOfDestination}</p>
    `;

    let manager = await User.findOne({ where: { uuid: lineManager } });
    let emailTo = manager.email;

    let checkSendEmail = await sendEmail(emailTo, emailTitle, emailDescription);

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
