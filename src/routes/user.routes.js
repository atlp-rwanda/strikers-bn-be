/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-import-module-exports */
import { Router } from 'express';

export const userRouter = Router();

const { addUser } = require('../controllers/user.controller');

/**
 * @description To create a new user
 * @api /api/v1/user/
 * @access Public
 * @type POST
 */
userRouter.post('/', addUser);

// exports.userRouter = userRouter;
