import { Request, Response } from 'express';

export const getIndex = (req: Request, res: Response) => {
  res.send('<h1>Typescript Express Server</h1>');
};

export const getAbout = (req: Request, res: Response) => {
  res.send('<h1>About Page</h1>');
};