import { Request, Response } from "express";
import { IHighschoolRequirement } from "../models/interfaces";
import { getAllHSRequirements, isValidHSRequirement } from "../services/highSchoolRequirementService";

// controller to correctly return multiplier info
export const getHSRequirements = async (req: Request, res: Response) => {
  try {
    const hsReq = await getAllHSRequirements();

    if (!hsReq) {
      return res.status(404).send({ message: "Multipliers Not Found" });
    }

    return res.status(200).json(hsReq);
  } catch (error) {
    return res.status(500).json({ message: "Network error" });
  }
};

// controller to update hs requirements
export const updateHSRequirements = async (req: Request, res: Response) => {
  try {
    // extract data
    const newHSRequirement: IHighschoolRequirement[] = req.body;
    console.log(newHSRequirement)

    // validate data
    if (!newHSRequirement || !isValidHSRequirement(newHSRequirement)) {
      return res.status(402).send({ message: "Incorrect Information" });
    }

    // update data
    // const result = await updateHSRequrirement(newHSRequirement);

    // if (!result) {
    //   return res.status(404).send({ message: "Multiplier not found" });
    // }

    return res.status(200).json(newHSRequirement);
  } catch (error) {
    return res.status(500).json({ message: "Network error" });
  }
};
