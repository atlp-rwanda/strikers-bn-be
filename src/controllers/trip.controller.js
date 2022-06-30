import _ from "lodash";
import { TripRequest } from "../models";
import { validateTripsNotifications } from '../validators/trip.validator';
import { v4 as uuidv4} from "uuid";


const addTrip = async (req, res) => {
  const user=req.userId;
  const { source,destination,DateOfTravel,DateOfDestination,status} = req.body
  const validateUserInput = validateTripsNotifications({ source,destination,DateOfTravel,DateOfDestination,status});
  if (validateUserInput.error) {
    return res.status(400).json(validateUserInput.error.details[0].message);
  }
  try {
    const trip = await TripRequest.create({user,source,destination, DateOfTravel,DateOfDestination,status })

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Trip request created successvely",
      data: trip,
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
   
  }
}


exports.getAllTrips = async (req, res) => {
  try {
    const trips = await TripRequest.findAll()
    return res.status(200).json({
      success: true,
      status: 200,
      data: trips,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: 'Something went wrong' })
  }
}

exports.getOneTrip = async (req, res) => {
  const id = req.params.id
  try {
    const trip = await TripRequest.findOne({
      where: { id },
      // include: 'id',
    })

    return res.status(200).json({
      success: true,
      status: 200,
      data: trip,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ error: 'Something went wrong' })
  }
}


exports.deleteOneTrip = async (req, res) => {
  const id = req.params.id
  try {
    const trip = await TripRequest.findOne({ where: { id } })

    await trip.destroy()

    return res.status(200).json({ message: 'Trip request deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}


exports.updateTrip = async (req, res) => {
  const id = req.params.id
  const { source,destination,DateOfTravel,DateOfDestination } = req.body
  try {
    const trip = await TripRequest.findOne({ where: { id } })

    trip.source = source
    trip.destination = destination
    trip.DateOfTravel = DateOfTravel
    trip.DateOfDestination = DateOfDestination

    await trip.save()

    return res.status(200).json({
      success: true,
      status: 200,
      data: trip,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.createMulticityRequest = async(req,res)=>{
  const destinations = req.body.destinations;
  if(destinations.length <= 1)
    return addTrip(req,res);
  
  let counter = 0;
  while(counter < destinations.length){
    let destination = destinations[counter];
    const tripRequestId = uuidv4();
    let { source,DateOfTravel,DateOfDestination, status } = req.body;
    const validateUserInput = validateTripsNotifications({ source,destination,DateOfTravel,
      DateOfDestination,status});
    if (validateUserInput.error) {
      return res.status(400).json(validateUserInput.error.details[0].message);
    }
    try {
      await TripRequest.create({source,destination, DateOfTravel,DateOfDestination,
        status, tripRequestId });
    } catch (err) {
      return  res.status(500).json({
                success: false,
                status: 500,
                message: err.message,
              });
    }
  }
  return res.status(201).json({
    success: true,
    status: 201,
    message: "Multicity Trip request created successvely",
    data: trip,
  })
}


exports.updateMulticityRequest = async(req,res)=>{




}

exports.addTrip = addTrip;