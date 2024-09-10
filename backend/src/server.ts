import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import connectDB from "./config/db";
import app from "./app";

// Set the PORT
const PORT = process.env.PORT ?? 5001;

// Start the server with DB connection
const startServer = async () => {
  try {
    // Establish database connection
    await connectDB();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

startServer();
