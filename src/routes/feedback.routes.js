import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
const feedbackRouter = Router();
import { addFeedback, getFeedbacks, getFeedback, updateFeedback, deleteFeedback  } from "../controllers/feedback.controller";


feedbackRouter.post("/:accomodationId", addFeedback);
feedbackRouter.get("/", getFeedbacks);
feedbackRouter.get("/:uuid", verifyToken, getFeedback);
feedbackRouter.put("/:uuid", verifyToken, updateFeedback);
feedbackRouter.delete("/:uuid", verifyToken, deleteFeedback);

export default feedbackRouter;