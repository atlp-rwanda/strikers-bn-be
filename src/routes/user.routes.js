/* eslint-disable import/no-import-module-exports */
import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import auth from "../utils/google-auth";
import facebookAuth from "../utils/facebook-Oauth";
import passport from "passport";
const userRouter = Router();

const {
  addUser,
  signIn,
  editUser,
  getUsers,
  getUser,
  verifyUser,
  resetPassword,
  newPassword,
  logout,
  resetPassword,
  newPassword,
  googleAuth,
} = require("../controllers/user.controller");

/**
 * @description To create a new user
 * @api v1/api/users/register
 * @access Public
 * @type POST
 */
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/v1/users/getusers",
    failureRedirect: "/auth/googleloginfailure",
  })
);

userRouter.get("/auth/googleLoginFailure", (req, res) => {
  res.send("Something went wrong..");
});

userRouter.get("/auth/facebook", passport.authenticate("facebook"));

userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/v1/users/auth/facebook",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

userRouter.post("/register", addUser);

/**
 * @description To update a user
 * @api v1/api/users/:uuid
 * @access Public
 * @type PUT
 */

userRouter.put("/updateuser/:uuid", verifyToken, editUser);
userRouter.get("/", getUsers);
userRouter.get("/:uuid", getUser);

userRouter.put("/updateuser/:uuid", verifyToken, editUser);
userRouter.get("/getusers", getUsers);
userRouter.get("/:uuid", getUser);
/**
 * @description To login using email and password
 * @api v1/api/users/login
 * @access Public
 * @type POST
 */
userRouter.post("/login", signIn);

userRouter.post("/resetpassword", resetPassword);
userRouter.patch("/resetpassword", newPassword);

/**
 * @description To verify user account
 * @api v1/api/users/verify/{email}
 * @access Public
 * @type GET
 */
userRouter.get("/verify/:email", verifyUser);
/**
 * @description User Logout
 * @api v1/api/users/:uuid/logout
 * @access Public
 * @type GET
 */
userRouter.get("/:uuid/logout", logout);

userRouter.get("/:uuid/welcome", verifyToken, (req, res) => {
  console.log(req.params.uuid);
  res.send(`${req.params.uuid}walkverese`);
});
export default userRouter;
