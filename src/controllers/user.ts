import { Request, Response } from 'express';

export const getLogin = (req: Request, res: Response) => {
  res.send('<h1>Login</h1>');
};

export const postLogin = (req: Request, res: Response) => {
  res.send("📨 POST to Login");
  // res.redirect('/');
};

export const getSignup = (req: Request, res: Response) => {
  res.send('<h1>Signup</h1>');
};

export const postSignup = (req: Request, res: Response) => {
  res.send('📨 POST to Signup');
  // res.redirect('/');
};