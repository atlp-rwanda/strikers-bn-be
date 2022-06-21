import { Accommodation } from '../models';
import Ratings from '../models/ratings';
import { User } from '../models';

export async function rateAccommodation(req, res) {
    try {
        const id = req.params.uuid;
        const accommodation = await Accommodation.findOne({ where: { uuid: id } });
        if (!accommodation) {
            return res.status(404).send({ message: 'Accommodation not found!' });
        }
        const user = await User.findOne({ where: { uuid: req.userId } });
        if(!user) {
            return res.status(404).send({ message: 'User not found! First register' });
        }
        const userId = req.userId;
        if(!Ratings.find(rating => rating.userId === userId)) {
            const newRating = await Ratings.create({
                userId,
                accommodationId: accommodation.id,
                numRating: req.body.numRating
              });
              res.status(201).send(newRating);
        }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }