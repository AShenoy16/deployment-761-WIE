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

// validate type of data to ensure it is correct
export const isValidMultiplier = (multiplier: IMultiplierData): boolean => {
  return (
    typeof multiplier._id === "string" &&
    typeof multiplier.rank2Multiplier === "number" &&
    typeof multiplier.rank3Multiplier === "number" &&
    typeof multiplier.sliderFactor === "number"
  );
};

// update the multiplier information with new multiplier data
export const updateMultiplier = async (newMultiplier: IMultiplierData) => {
  try {
    // update collection with new info
    const updatedMultiplier = await MultiplierData.findByIdAndUpdate(
      newMultiplier._id,
      {
        $set: {
          rank2Multiplier: newMultiplier.rank2Multiplier,
          rank3Multiplier: newMultiplier.rank3Multiplier,
          sliderFactor: newMultiplier.sliderFactor,
        },
      },
      { new: true } // return document
    );

    return updatedMultiplier;
  } catch (error) {
    console.error("Error updating multipliers:", error);
    throw error;
  }
};
