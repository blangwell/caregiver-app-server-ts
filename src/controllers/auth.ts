import { Request, Response, NextFunction } from 'express';
import { User, UserDocument } from '../models/User';
import { CallbackError, NativeError } from 'mongoose';
import { check, sanitize, validationResult } from "express-validator";

export const postLogin = (req: Request, res: Response) => {
  res.send("📨 POST to Login");
};

export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password is not long enough").isLength({min: 8}).run(req);
  await check("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
  
  // extract validation errors to Result object
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) { // if there are errors
    // flash message here? 
    res.json(errors);
  }

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