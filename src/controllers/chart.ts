import { Request, Response } from 'express';

export const getNewChart = (req: Request, res: Response) => {
  res.send("<h1>New Chart</h1>");
};

export const postNewChart = (req: Request, res: Response) => {
  res.send("📨 POST New Chart");
};
