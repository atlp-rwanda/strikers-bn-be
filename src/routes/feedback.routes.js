import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
const feedbackRouter = Router();
import { addFeedback, getFeedbacks, getFeedback, updateFeedback, deleteFeedback  } from "../controllers/feedback.controller";


feedbackRouter.post("/:accomodationId", addFeedback);
feedbackRouter.get("/", getFeedbacks);
feedbackRouter.get("/:uuid", getFeedback);
feedbackRouter.put("/:uuid", updateFeedback);
feedbackRouter.delete("/:uuid", deleteFeedback);

export default feedbackRouter;