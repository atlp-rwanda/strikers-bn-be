import { Router } from "express";
const userRouter = Router();

const {
  addUser,
  signIn,
  verifyUser,
} = require("../controllers/user.controller");

/**
 * @description To create a new user
 * @api v1/api/users/register
 * @access Public
 * @type POST
 */
userRouter.post("/register", addUser);

/**
 * @description To login using email and password
 * @api v1/api/users/login
 * @access Public
 * @type POST
 */
userRouter.post("/login", signIn);

/**
 * @description To verify user account
 * @api v1/api/users/verify/{email}
 * @access Public
 * @type GET
 */
userRouter.get("/verify/:email", verifyUser);

module.exports = userRouter;
