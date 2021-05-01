import { Request, Response } from 'express';

export const postChart = (req: Request, res: Response) => {
  res.send("📨 POST New Chart");
};

export const putChart = (req: Request, res: Response) => {
  res.send("📨 PUT Existing Chart");
};

export const deleteChart = (req: Request, res: Response) => {
  res.send("💣 DELETE Existing Chart");
}