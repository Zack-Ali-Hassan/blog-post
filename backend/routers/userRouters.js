import express from 'express';
import {userLoginValidation, userRegisterValidation} from '../validators/userValidation.js';
import {  getUserProfile, loginUser, logout, registerUsers } from '../controller/userController.js';
import { userAuthentication } from '../midlewares/authUser.js';
const userRouter = express.Router();

userRouter.route('/register-user').post(userRegisterValidation,registerUsers);
userRouter.route('/login-user').post(userLoginValidation,loginUser);
userRouter.route('/get-user-profile').get(userAuthentication,getUserProfile);
userRouter.route('/logout').post(logout);

export default userRouter;