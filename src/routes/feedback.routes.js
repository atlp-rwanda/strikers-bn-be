import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
const feedbackRouter = Router();
import { addFeedback, getFeedbacks, getFeedback, updateFeedback, deleteFeedback  } from "../controllers/feedback.controller";


feedbackRouter.post("/feedback/:accomodationId",verifyToken, addFeedback);
feedbackRouter.get("/feedbacks", verifyToken, getFeedbacks);
feedbackRouter.get("/feedback/:uuid", verifyToken, getFeedback);
feedbackRouter.put("/feedback/:uuid", verifyToken, updateFeedback);
feedbackRouter.delete("/feedback/:uuid", verifyToken, deleteFeedback);