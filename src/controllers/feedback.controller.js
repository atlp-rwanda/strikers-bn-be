import { Feedback, Accommodation } from '../models';

exports.addFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create({
            userId: req.userId,
            accomodationId: req.params.accomodationId,
            feedback: req.body.feedback,
        });
        return res.status(200).json({
            success: true,
            status: 201,
            message: "Feedback added successfully!",
            data: feedback
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            status: 400,
            message: err.message,
        });
    }
}

exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll({ include: [ { model: Accommodation, as: 'accomodation' } ] });
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Feedbacks fetched successfully!",
            data: feedbacks
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            status: 400,
            message: err.message,
        });
    }
}

exports.getFeedback = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const feedback = await Feedback.findOne({ where: { uuid } });
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Feedback fetched successfully!",
            data: feedback
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            status: 400,
            message: err.message,
        });
    }
}

exports.updateFeedback = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const feedback = await Feedback.findOne({ where: { uuid } });
        if (feedback) {
            if (feedback.userId === req.userId) {
                await Feedback.update({ feedback: req.body.feedback }, { where: { uuid } });
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Feedback updated successfully!",
                    data: feedback
                });
            }
            else {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "You are not authorized to update this feedback!",
                });
            }
        }
        else {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "That feedback doesn't exist!",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            status: 400,
            message: err.message,
        });
    }
}

exports.deleteFeedback = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const feedback = await Feedback.findOne({ where: { uuid } });
        if (feedback) {
            if (feedback.userId === req.userId) {
                await Feedback.destroy({ where: { uuid } });
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Feedback deleted successfully!",
                });
            }
            else {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "You are not authorized to delete this feedback!",
                });
            }
        }
        else {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "That feedback doesn't exist!",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            status: 400,
            message: err.message,
        });
    }
}


