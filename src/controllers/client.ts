import { Request, Response } from 'express';

export const getAllClients = (req: Request, res: Response) => {
  res.send("GET Client Index");
};

export const getClient = (req: Request, res: Response) => {
  res.send("GET Single Client");
};

export const postClient = (req: Request, res: Response) => {
  res.send("🆕 POST New Client");
};

export const putClient = (req: Request, res: Response) => {
  res.send("📈 PUT Existing Client");
};

export const deleteClient = (req: Request, res: Response) => {
  res.send("💣 DELETE Existing Client");
};