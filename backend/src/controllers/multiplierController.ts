
import { Request, Response } from "express";
import { getAllMultipliers, isValidMultiplier } from "../services/multiplierService";
import { IMultiplierData } from "../models/interfaces";

// controller to correctly return multiplier info
export const getMultipliers = async (req: Request, res: Response) => {
  const multiplier = await getAllMultipliers();

  if (!multiplier) {
    return res.status(404).send({ message: "Multipliers Not Found" });
  }

  return res.status(200).json(multiplier);
};

// controller to update multipler
export const updateMultipliers = async (req: Request, res: Response) => {

  const newMultiplier: IMultiplierData = req.body;
  console.log(newMultiplier)


  if (!newMultiplier || !isValidMultiplier(newMultiplier)) {
    return res.status(402).send({ message: "Incorrect Information" });
  }

  return res.status(200).json(newMultiplier);
};
