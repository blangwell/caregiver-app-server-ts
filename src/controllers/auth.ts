import { Request, Response, NextFunction } from 'express';
import { User, UserDocument } from '../models/User';
import { CallbackError, NativeError } from 'mongoose';
import { check, sanitize, validationResult } from "express-validator";

export const postLogin = (req: Request, res: Response) => {
  res.send("📨 POST to Login");
};

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", )
  
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  
  User.findOne({ email: req.body.email }, (err: NativeError, existingUser: UserDocument) => {
    if (err) return next(err);
    if (existingUser) {
      res.send('User already exists');
    }
    user.save(err => {
      if (err) return next(err);
      res.send('user created successfully!')
    })
  });
};