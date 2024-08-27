import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import { User } from "../models/userModel";
import Quiz from "../models/QuizModel";

// Dummy data for Quiz
const quizData = {
  quizName: "Engineering Specialization Quiz",
  quizQuestions: [
    {
      questionType: "MCQ",
      questionText: "What is your preferred engineering field?",
      questionNumber: 1,
      answerOptions: [
        {
          optionId: "1",
          text: "Mechanical",
          weightings: {
            "Mechanical Engineering": 10,
            "Electrical Engineering": 5,
          },
        },
        {
          optionId: "2",
          text: "Electrical",
          weightings: {
            "Mechanical Engineering": 5,
            "Electrical Engineering": 10,
          },
        },
      ],
    },
    {
      questionType: "Ranking",
      questionText: "Rank the following specializations",
      questionNumber: 2,
      answerOptions: [
        {
          optionId: "1",
          text: "Mechanical",
          weightings: {
            "Mechanical Engineering": { 1: 10, 2: 5 },
            "Electrical Engineering": { 1: 5, 2: 10 },
          },
        },
        {
          optionId: "2",
          text: "Electrical",
          weightings: {
            "Mechanical Engineering": { 1: 5, 2: 10 },
            "Electrical Engineering": { 1: 10, 2: 5 },
          },
        },
      ],
    },
    {
      questionType: "Slider",
      questionText: "Rate your interest in each specialization from 1 to 10",
      questionNumber: 3,
      sliderRange: {
        sliderId: "1",
        min: 1,
        max: 10,
        weightings: {
          "Mechanical Engineering": [1, 5, 10],
          "Electrical Engineering": [1, 5, 10],
        },
      },
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Hardcoded Users list for testing
const dummyUsers = [
  { password: "Adi123", email: "adi123456@example.com" },
  { password: "Mitchell", email: "mitchell@example.com" },
  { password: "Steven", email: "Steven@example.com" },
  { password: "Admin", email: "wen-admin@gmail.com" },
];

// This is a standalone program which will populate the database with initial data.
async function run() {
  console.log("Connecting to database...");

  const mongoUri: string = process.env.MONGODB_CONNECTION_STRING as string;
  await mongoose.connect(mongoUri);

  // Clear db

  console.log("Clearing db...");
  await clearDatabase();
  console.log();

  // add users
  console.log("Adding Users...");
  await addUsers();
  console.log();

  console.log("Adding Quiz Info...");
  await addQuizInfo();
  console.log();

  await mongoose.disconnect();
  console.log("Done!");
}

async function clearDatabase() {
  await User.deleteMany({});
  await Quiz.deleteMany({});

  console.log(`Cleared database`);
}

async function addUsers() {
  for (let user of dummyUsers) {
    const dbUser = new User(user);

    await dbUser.save();
    console.log(`User Saveded _id${dbUser._id}, email = ${dbUser.email}`);
  }
}

async function addQuizInfo() {
  const quiz = new Quiz(quizData);
  await quiz.save();
  console.log(`Quiz Saved _id: ${quiz._id}, quizName = ${quiz.quizName}`);
}

run();
