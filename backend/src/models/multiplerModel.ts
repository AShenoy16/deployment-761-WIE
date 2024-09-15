import mongoose, { Schema, Document } from "mongoose";
import { IMultiplierData } from "./interfaces";

// Define the schema for multiplier data

// Define the nonZero validator function
const nonZero = (value: number) => {
  return value !== 0;
};

// Define the schema for multiplier data
const multiplierSchema: Schema = new Schema(
  {
    rank2Multiplier: {
      type: Number,
      required: [true, "rank2Multiplier is required"],
      validate: {
        validator: nonZero,
        message: "rank2Multiplier cannot be zero",
      },
    },
    rank3Multiplier: {
      type: Number,
      required: [true, "rank3Multiplier is required"],
      validate: {
        validator: nonZero,
        message: "rank3Multiplier cannot be zero",
      },
    },
    sliderFactor: {
      type: Number,
      required: [true, "sliderFactor is required"],
      validate: {
        validator: nonZero,
        message: "sliderFactor cannot be zero",
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the model for the multiplier data
const MultiplierData = mongoose.model<IMultiplierData>(
  "MultiplierData",
  multiplierSchema
);

export default MultiplierData;
