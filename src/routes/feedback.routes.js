import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
const feedbackRouter = Router();
import { addFeedback, getFeedbacks, getFeedback } from "../controllers/feedback.controller";


feedbackRouter.post("/feedback/:accomodationId",verifyToken, addFeedback);