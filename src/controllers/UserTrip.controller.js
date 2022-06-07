import _ from "lodash";
import { Trip } from "../models";
const express=require("express");
const app = express()
app.use(express.json())


    exports.addTrip = async (req, res) => {
      const user=req.userId;
  const { source, Destination, DateOfTravel,DateOfDestination } = req.body
console.log(user);
  try {
    const trip = await Trip.create({  user,source, Destination, DateOfTravel,DateOfDestination })

    return res.json(trip)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}


    exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll()

    return res.json(trips)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.getOneTrip = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const trip = await Trip.findOne({
      where: { uuid },
      include: 'trip',
    })

    return res.json(trip)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}


    exports.deleteOneTrip = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const trip = await Trip.findOne({ where: { uuid } })

    await trip.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}


    exports.updateTrip = async (req, res) => {
  const uuid = req.params.uuid
  const { name, email, role } = req.body
  try {
    const trip = await User.findOne({ where: { uuid } })

    trip.name = source
    trip.name = destination
    trip.email = DateOfTravel
    trip.role = DateOfDestination

    await trip.save()

    return res.json(trip)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

