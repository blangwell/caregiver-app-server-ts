import { Request, Response, NextFunction } from 'express';
import { User, UserDocument } from '../models/User';
import { CallbackError, NativeError } from 'mongoose';
import { check, validationResult } from "express-validator";
import { IVerifyOptions } from 'passport-local';
import passport from 'passport';
import { createUserToken } from '../middleware/auth';
import bcrypt from 'bcrypt';


export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password cannot be blank").isLength({min: 1}).run(req);
  await check("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

  // extract validation errors to Result object
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors);
  }

  User.findOne({ email: req.body.email }, async (err: NativeError, foundUser: UserDocument) => {
    if (err) return next(err);
    if (!foundUser) return res.status(400).send('No user found with that email!');
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password);
    if (!matchPasswords) return res.status(400).send('Password is incorrect!');
    res.json({
      msg: 'Authenicated successfully!',
      token: createUserToken(req, foundUser)
    });
  })
};

export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password is not long enough").isLength({min: 8}).run(req);
  await check("confirmPassword", "Passwords do not match").equals(req.body.password).run(req);
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
      return res.send("User already exists");
    }
    user.save(err => {
      if (err) return next(err);
      req.login(user, err => {
        if (err) return next(err);
      });
      res.json({
        msg: "user created and logged in successfully!",
        token: createUserToken(req, user),
        user: user
      });
      
    })
  });
};