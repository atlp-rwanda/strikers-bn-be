import { TripRequestComments, Trip, Notifications, User } from "../models";

exports.addComments = async (req, res) => {
  try {
    const comment = await TripRequestComments.create({
      userId: req.userId,
      tripId: req.params.tripId,
      comment: req.body.comment,
    });

    const trip = await Trip.findOne({ where: { id: req.params.tripId } });
    let commenter = await User.findOne({ where: { uuid: req.userId } });
    let requester = await User.findOne({ where: { id: trip.userId } });

    // console.log("Comments" + req.body.comment);

    await Notifications.create({
      title: `Comment Added by ${commenter.firstName} ${commenter.lastName}`,
      description: `${commenter.firstName} ${commenter.lastName} said : ${req.body.comment}`,
      to: requester.uuid,
    })
      .then(() => {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Comment added successfully!",
          data: comment,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await TripRequestComments.findAll({
      include: [{ model: Trip, as: "trip" }],
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Comments fetched successfully!",
      data: comments,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteComments = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const comment = await TripRequestComments.findOne({ where: { id: uuid } });
    if (comment) {
      await TripComment.destroy({ where: { id: uuid } });
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Comment deleted successfully!",
      });
    } else {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Comment doesn't exist!",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      status: 404,
      message: err.message,
    });
  }
};
