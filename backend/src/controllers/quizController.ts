import { Request, Response } from "express";

export const getQuiz = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "TODO implement quiz endpoints" });
};
