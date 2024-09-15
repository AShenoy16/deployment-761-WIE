import MultiplierData from "../models/multiplerModel";

// get the multiplier information
export const getAllMultipliers = async () => {
    try {
      const multipliers = await MultiplierData.find().select('_id rank3Multiplier rank2Multiplier sliderFactor');
      return multipliers;
    } catch (error) {
      console.error('Error fetching multipliers:', error);
      throw error;
    }
  };
  