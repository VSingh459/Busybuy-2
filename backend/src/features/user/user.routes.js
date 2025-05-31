import exp from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

const userRouter = exp.Router();
const uControl = new UserController();

userRouter.post('/signup', uControl.signup);
userRouter.post('/login', uControl.login);
userRouter.post('/logout', uControl.logout);

export default userRouter;
