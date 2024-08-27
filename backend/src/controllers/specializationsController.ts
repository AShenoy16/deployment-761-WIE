import { Request, Response } from "express";

export const getSpecs = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "TODO implement spec and test endpoints" });
};
