import { Router } from "express";
const userRouter = Router();

const { addUser, signIn, resetPasswordLink, newPassword} = require("../controllers/user.controller");

/**
 * @description To create a new user
 * @api v1/api/user/register
 * @access Public
 * @type POST
 */
userRouter.post("/register", addUser);

/**
 * @description To login using email and password
 * @api v1/api/user/login
 * @access Public
 * @type POST
 */
userRouter.post("/login", signIn);
userRouter.post("/resetpassword", resetPasswordLink)
userRouter.patch("/resetpassword", newPassword);

module.exports = userRouter;
