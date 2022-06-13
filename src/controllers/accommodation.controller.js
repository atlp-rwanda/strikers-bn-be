import { Accommodation } from "../models";
import { cloudinary } from '../utils/cloudinary'

export async function getAccommodation(req, res) {
  try {
    const accommodations = await Accommodation.findAll();
    if (accommodations.length == 0) {
      return res.status(200).send('No accommodation found!');
    }
    return res.status(200).send(accommodations);
  } catch (err) {
    console.log(`errrr ${err}`);
    return res.status(400).send(err);
  }
}

export async function createAccommodation(req, res) {
  const {
    name,
    description,
    location,
    roomNumber,
    latitude,
    longitude,
    highlights,
    ammenities,
  } = req.body;
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const picture = result.secure_url;
    const newAccommodation = await Accommodation.create({
      name,
      description,
      location,
      roomNumber,
      picture,
      latitude,
      longitude,
      highlights,
      ammenities,
    });

    // const geolocation = { latitude, longitude };
    // const room = {
    //   bedType: req.body.bedType,
    //   cost: req.body.cost
    // };
    res.status(201).json(newAccommodation);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}
