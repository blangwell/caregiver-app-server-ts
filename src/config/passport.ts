import passport from 'passport';
import * as passportLocal from 'passport-local';

import { User, UserDocument } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { NativeError } from 'mongoose';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
    if (err) return done(err);
    if (!user) return done(undefined, false, { message: `Email ${email} not found!`});

    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) return done(err);
      if (isMatch) return done(undefined, user);
      return done(undefined, false, { message: "Invalid email or password"});
    });
  });
}));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  res.send('redirect to login logic');
}