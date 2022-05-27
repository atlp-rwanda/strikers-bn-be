import { Router } from 'express';
const userRouter = Router();

const { addUser } =  require('../controllers/user.controller');

/**
 * @description To create a new user
 * @api v1/api/user/
 * @access Public
 * @type POST
 */

userRouter.post('/', addUser);

exports.userRouter = userRouter;