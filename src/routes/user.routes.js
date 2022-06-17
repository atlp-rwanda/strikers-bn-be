/* eslint-disable import/no-import-module-exports */
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';

const userRouter = Router();

const { addUser, signIn,editUser,getUsers,getUser,verifyUser,resetPassword,newPassword } = require("../controllers/user.controller");
const {
  addUser, signIn, editUser, getUsers, getUser, verifyUser, logout
} = require('../controllers/user.controller');

/**
 * @description To create a new user
 * @api v1/api/users/register
 * @access Public
 * @type POST
 */
userRouter.post('/register', addUser);

/**
 * @description To update a user
 * @api v1/api/user/uuid
 * @access Public
 * @type PUT
 */
userRouter.put('/updateuser/:uuid', verifyToken, editUser);
userRouter.get('/getusers', getUsers);
userRouter.get('/:uuid', getUser);
/**
 * @description To login using email and password
 * @api v1/api/users/login
 * @access Public
 * @type POST
 */
userRouter.post('/login', signIn);


userRouter.post("/resetpassword", resetPassword)
userRouter.patch("/resetpassword", newPassword);

/**
 * @description To verify user account
 * @api v1/api/users/verify/{email}
 * @access Public
 * @type GET
 */
userRouter.get('/verify/:email', verifyUser);
/**
 * @description User Logout
 * @api v1/api/users/:uuid/logout
 * @access Public
 * @type GET
 */
userRouter.get('/:uuid/logout', logout);

userRouter.get('/:uuid/welcome',verifyToken,(req,res)=>{
  console.log(req.params.uuid);
  res.send(req.params.uuid+'walkverese');
})
export default userRouter;
