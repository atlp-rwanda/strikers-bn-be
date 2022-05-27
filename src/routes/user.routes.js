import { Router } from 'express';
const userRouter = Router();

const { addUser } =  require('../controllers/user.controller');

/**
 * @description To create a new user
 * @api /api/v1/user/
 * @access Public
 * @type POST
 */
userRouter.post('/', addUser);

exports.userRouter = userRouter;