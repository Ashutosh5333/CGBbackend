import express, { Router, RequestHandler } from 'express';
import { Getuserdata, RegisterUserinfo } from '../controller/user.controller';

const userRouter: Router = express.Router();

userRouter.post('/message', RegisterUserinfo as RequestHandler);
userRouter.get("/getdata",Getuserdata )



export default userRouter;
