import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
const tripCommentRouter = Router();
import { addComments, getComments, deleteComments  } from "../controllers/tripComment.controller";


tripCommentRouter.post("/:tripId", verifyToken, addComments);
tripCommentRouter.get("/:uuid", verifyToken, getComments);
tripCommentRouter.delete("/:uuid", verifyToken, deleteComments);

export default tripCommentRouter;