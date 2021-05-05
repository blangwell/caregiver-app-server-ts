import bcrypt from 'bcrypt';
import passport from 'passport';
import { NativeError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { User, UserDocument } from '../models/User';
import * as jwt from 'jsonwebtoken';

type optionsObject = {
  secretOrKey: string,
  jwtFromRequest: JwtFromRequestFunction
};

const options: optionsObject = {
  secretOrKey: process.env.JWT_SECRET as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const retrieveUser = (jwtPayload: any, done: any) => {
  User.findOne({ id: jwtPayload.id}, (err: NativeError, user: UserDocument) => {
    if (err) return done(err, null);
    if (!user) return done(null, false); 
    return done(null, user);
  });
};

const jwtStrategy = new Strategy(options, retrieveUser);

passport.use(jwtStrategy);
passport.initialize();

export const createUserToken = (req: Request, user: UserDocument) => {
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!user || !validPassword) {
    const err = new Error('Invalid Credentials 🚨');
    return err;
  } 
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: 3600 }
  );
};