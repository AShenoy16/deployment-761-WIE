import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import { User } from "../models/userModel";
import Quiz from "../models/QuizModel";
import Specialization from "../models/SpecializationModel";
import RoleModel from "../models/RoleModel";

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

// Testimonals
const dummyTestimonials = [
  { testimonialId: "1", name: "Jane Doe", description: "Engineering was a great choice for me!" },
  { testimonialId: "2", name: "John Smith", description: "The challenges are rewarding." },
  { testimonialId: "3", name: "Alice Johnson", description: "A fulfilling career path." },
];

// specs
const dummySpecializations = [
  {
    name: "Software Engineering",
    description: "Focus on software development and engineering principles.",
    photoUrl: "https://example.com/software-engineering.jpg",
    careerPathways: ["Software Developer", "System Architect", "DevOps Engineer"],
    startingSalary: 60000,
    medianSalary: 90000,
    experiencedSalary: 120000,
    jobAvailability: "High",
    testimonials: [dummyTestimonials[0], dummyTestimonials[1]], // Include some testimonials
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Civil Engineering",
    description: "Design and construct infrastructure projects.",
    photoUrl: "https://example.com/civil-engineering.jpg",
    careerPathways: ["Structural Engineer", "Project Manager", "Urban Planner"],
    startingSalary: 55000,
    medianSalary: 85000,
    experiencedSalary: 110000,
    jobAvailability: "Medium",
    testimonials: [dummyTestimonials[2]], // Include a testimonial
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Electrical Engineering",
    description: "Work on electrical systems and technologies.",
    photoUrl: "https://example.com/electrical-engineering.jpg",
    careerPathways: ["Electrical Engineer", "Electronics Engineer", "Power Systems Engineer"],
    startingSalary: 58000,
    medianSalary: 88000,
    experiencedSalary: 115000,
    jobAvailability: "High",
    testimonials: [], // No testimonials
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const dummyRoleModels = [
  {
    name: 'Jane Doe',
    description: 'An inspiring role model in engineering.',
    photoUrl: 'https://example.com/photos/jane_doe.jpg',
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/jane-doe',
      instagram: 'https://instagram.com/jane_doe'
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    name: 'John Smith',
    description: 'A renowned figure in the field of software development.',
    photoUrl: 'https://example.com/photos/john_smith.jpg',
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/john-smith',
      instagram: 'https://instagram.com/john_smith'
    },
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z')
  },
  {
    name: 'Alice Johnson',
    description: 'A leading advocate for diversity in STEM.',
    photoUrl: 'https://example.com/photos/alice_johnson.jpg',
    socialMediaLinks: {
      linkedin: 'https://linkedin.com/in/alice-johnson',
      instagram: 'https://instagram.com/alice_johnson'
    },
    createdAt: new Date('2024-01-03T00:00:00Z'),
    updatedAt: new Date('2024-01-03T00:00:00Z')
  }
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

  // add quiz info
  console.log("Adding Quiz Info...");
  await addQuizInfo();
  console.log();

  // add spec info
  console.log("Adding Spec Info...");
  await addSpecInfo();
  console.log();

  // add role model info
  console.log("Adding Role Model Info...");
  await addRoleModels();
  console.log();

  await mongoose.disconnect();
  console.log("Done!");
}

async function clearDatabase() {
  await User.deleteMany({});
  await Quiz.deleteMany({});
  await Specialization.deleteMany({})

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

async function addSpecInfo() {
  for (let spec of dummySpecializations) {
    const dbSpec = new Specialization(spec);

    await dbSpec.save();
    console.log(`Role Model Saveded _id${dbSpec._id}, name = ${dbSpec.name}`);
  }
}

async function addRoleModels() {
  for (let roleModel of dummyRoleModels) {
    const dbRoleModel = new RoleModel(roleModel);

    await dbRoleModel.save();
    console.log(`Spec Saveded _id${dbRoleModel._id}, name = ${dbRoleModel.name}`);
  }
}

run();
