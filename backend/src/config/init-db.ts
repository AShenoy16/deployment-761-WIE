import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import { User } from "../models/userModel";

// Hardcoded Users list for testing
const dummyUsers = [
  { password: "Adi", email: "adi@example.com" },
  { password: "Mitchell", email: "mitchell@example.com" },
  { password: "Steven", email: "Steven@example.com" },
  { password: "Admin", email: "wen-admin@gmail.com" },
];

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

  // Clear db

  console.log("Clearing db...");
  await clearDatabase();
  console.log();

  // add users
  console.log("Adding Users...");
  await addUsers();
  console.log();

  await mongoose.disconnect();
  console.log("Done!");
}

async function clearDatabase() {
  const usersDeleted = await User.deleteMany({});

  console.log(`Cleared database (removed ${usersDeleted.deletedCount} Users`);
}

async function addUsers() {
  for (let user of dummyUsers) {
    const dbUser = new User(user);

    await dbUser.save();
    console.log(`User Saveded _id${dbUser._id}, email = ${dbUser.email}`);
  }
}

run();
