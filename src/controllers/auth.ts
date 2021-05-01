import { Request, Response } from 'express';

export const postLogin = (req: Request, res: Response) => {
  res.send("📨 POST to Login");
};

export const postSignup = (req: Request, res: Response) => {
  res.send('📨 POST to Signup');
};