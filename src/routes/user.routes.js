import { Router } from "express";
const router = Router();

const { addUser, signIn } = require("../controllers/user.controller");

/**
 * @description To create a new user
 * @api v1/api/user/register
 * @access Public
 * @type POST
 */
router.post("/register", addUser);

/**
 * @description To login using email and password
 * @api v1/api/user/login
 * @access Public
 * @type POST
 */
router.post("/login", signIn);

module.exports = router;
