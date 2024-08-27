import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mongoUri: string = process.env.MONGODB_CONNECTION_STRING as string
  try {
    // only connect if not alr connected
    if (mongoose.connection.readyState === 0) {
      console.log("MongoDB Connection String:", mongoUri);
      await mongoose.connect(mongoUri);
      console.log("MongoDB Connected");
      return
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
