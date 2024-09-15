import { IMultiplierData } from "../models/interfaces";
import MultiplierData from "../models/multiplerModel";

// get the multiplier information
export const getAllMultipliers = async () => {
  try {
    const multipliers = await MultiplierData.find().select(
      "_id rank3Multiplier rank2Multiplier sliderFactor"
    );
    return multipliers;
  } catch (error) {
    console.error("Error fetching multipliers:", error);
    throw error;
  }
};

export const isValidMultiplier = (multiplier: IMultiplierData): boolean => {
  return (
    typeof multiplier._id === "string" &&
    typeof multiplier.rank2Multiplier === "number" &&
    typeof multiplier.rank3Multiplier === "number" &&
    typeof multiplier.sliderFactor === "number"
  );
};
