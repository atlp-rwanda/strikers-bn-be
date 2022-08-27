import { Accommodation } from '../models';
import { Ratings } from '../models';
import { User } from '../models';

export async function rateAccommodation(req, res) {
    try {
        console.log(req.body)
        const id = req.params.uuid;
        const accommodation = await Accommodation.findOne({ where: { uuid: id } });
        if (!accommodation) {
            return res.status(404).send({ message: 'Accommodation not found!' });
        }
        const user = await User.findOne({ where: { uuid: req.userId } });
        if (!user) {
            return res.status(404).send({ message: 'User not found! First register' });
        }
        const userId = req.userId;
        const rating = await Ratings.findOne({ where: { userId: req.userId } });
        // console.log(rating);
        console.log(userId);
        console.log(accommodation.uuid);
        if (!rating) {
            const newRating = await Ratings.create({
                userId:userId,
                accomodationId: accommodation.uuid,
                numRating: req.body.numRating
            });
            // console.log(newRating);
            return res.status(201).json({
                success: true,
                status: 201,
                message: 'rating created successfully',
                data: newRating,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}
export async function  getRatings(req,res){
  const userId=req.userId;
  console.log(userId);
   try{
       const ratings= await Ratings.findAll();
       console.log(ratings);
       res.status(200).send(ratings);
   }catch(err){
    res.status(500).send({ message: `Error: ${err}` });
   }
}