import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // only connect if not alr connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
      console.log("MongoDB Connected");
      return
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
