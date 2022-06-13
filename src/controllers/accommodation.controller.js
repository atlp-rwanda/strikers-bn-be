import { Accommodation } from '../models';
import { Roles } from '../models/roles';

export async function getAccommodation(req, res) {
  try {
    
    const accommodations = await Accommodation.findAll()
    res.status(200).send(accommodations);
  } catch (err) {
    console.log("errrr " + err)
    return res.status(400).send(err);
  }
}

export async function createAccommodation(req, res) {
  const {
    name, description, location, highlights, ammenities
  } = req.body;
  try {
    console.log('hereee');
    const newAccommodation = await Accommodation.create({
      name, description, location, highlights, ammenities
    });
    
    // const geolocation = { latitude, longitude };
    // const room = {
    //   bedType: req.body.bedType,
    //   cost: req.body.cost
    // };
    res.status(201).json(newAccommodation);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
}
