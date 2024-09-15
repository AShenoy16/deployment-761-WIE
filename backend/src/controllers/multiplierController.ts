import { Request, Response } from "express";
import {
  getAllMultipliers,
  isValidMultiplier,
  updateMultiplier,
} from "../services/multiplierService";
import { IMultiplierData } from "../models/interfaces";

// controller to correctly return multiplier info
export const getMultipliers = async (req: Request, res: Response) => {
  try {
    const multiplier = await getAllMultipliers();

    if (!multiplier) {
      return res.status(404).send({ message: "Multipliers Not Found" });
    }

    return res.status(200).json(multiplier);
  } catch (error) {
    return res.status(500).json({ message: "Network error" });
  }
};

// controller to update multipler
export const updateMultipliers = async (req: Request, res: Response) => {
  try {
    const newMultiplier: IMultiplierData = req.body;

    if (!newMultiplier || !isValidMultiplier(newMultiplier)) {
      return res.status(402).send({ message: "Incorrect Information" });
    }

    const result = await updateMultiplier(newMultiplier);

    if (!result) {
      return res.status(404).send({ message: "Multiplier not found" });
    }

    return res.status(200).json(newMultiplier);
  } catch (error) {
    return res.status(500).json({ message: "Network error" });
  }
};
