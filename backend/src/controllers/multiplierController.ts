
import { Request, Response } from "express";
import { getAllMultipliers } from "../services/multiplierService";

// controller to correctly return multiplier info
export const getMultipliers = async (req: Request, res: Response) => {
  const multiplier = await getAllMultipliers();

  if (!multiplier) {
    return res.status(404).send({ message: "Multipliers Not Found" });
  }

  return res.status(200).json(multiplier);
};
