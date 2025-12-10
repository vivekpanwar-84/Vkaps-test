import express from 'express';
import { loginuser, registeruser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registeruser);
userRouter.post('/login', loginuser);




export default userRouter;
