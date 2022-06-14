import { Accommodation } from '../models';
import { cloudinary } from '../utils/cloudinary';

export async function getAccommodation(req, res) {
  try {
    const accommodations = await Accommodation.findAll();
    if (accommodations.length == 0) {
      return res.status(200).send({ message: 'No accommodation found!' });
    }
    return res.status(200).send(accommodations);
  } catch (err) {
    console.log(`errrr ${err}`);
    return res.status(404).send(err);
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
    res.status(201).send(newAccommodation);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

export async function updateAccommodation(req, res) {
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
  const id = req.params.uuid;
  try {
    const accommodation = await Accommodation.findOne({ where: { uuid: id } });
    if (!accommodation) {
      return res.status(404).send({ message: 'Accommodation not found!' });
    }
    await accommodation.update({
      name, description, location, roomNumber, latitude, longitude, highlights, ammenities
    }, { where: { uuid: req.params.uuid } });

    return res.status(200).send({ message: `Accommodation with uuid ${id} updated` });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

export async function deleteAccommodation(req, res) {
  try {
    const id = req.params.uuid;
    await Accommodation.destroy({ where: { id } });

    return res.status(200).send({ message: `Accommodation with id ${id} deleted!!` });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}
