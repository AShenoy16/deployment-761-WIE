import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import { User } from "../models/userModel";
import Quiz from "../models/QuizModel";
import Specialization from "../models/SpecializationModel";
import RoleModel from "../models/RoleModel";
import SliderQuestion from "../models/SliderModel";
import RankingQuestion from "../models/RankingModel";
import MCQQuestion from "../models/MCQModel";
import { IRankingQuestion } from "../models/interfaces";

// Dummy data for Quiz
const quizData = {
  quizName: "Engineering Specialization Quiz",
  quizQuestions: [
    {
      questionType: "MCQ",
      questionText: "What is your preferred engineering field?",
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
  {
    email: "adi123456@example.com",
    passwordHash: "hashedAdi123",
    role: "user",
    sessionId: "sessionId1",
  },
  {
    email: "mitchell@example.com",
    passwordHash: "hashedMitchell",
    role: "user",
    sessionId: "sessionId2",
  },
  {
    email: "steven@example.com",
    passwordHash: "hashedSteven",
    role: "user",
    sessionId: "sessionId3",
  },
  {
    email: "wen-admin@gmail.com",
    passwordHash: "hashedAdmin",
    role: "admin",
    sessionId: "sessionId4",
  },
];

// Testimonals
const dummyTestimonials = [
  {
    testimonialId: "1",
    name: "Jane Doe",
    description: "Engineering was a great choice for me!",
  },
  {
    testimonialId: "2",
    name: "John Smith",
    description: "The challenges are rewarding.",
  },
  {
    testimonialId: "3",
    name: "Alice Johnson",
    description: "A fulfilling career path.",
  },
];

// specs
const dummySpecializations = [
  {
    name: "Software Engineering",
    description: "Focus on software development and engineering principles.",
    photoUrl: "https://example.com/software-engineering.jpg",
    careerPathways: [
      "Software Developer",
      "System Architect",
      "DevOps Engineer",
    ],
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
    careerPathways: [
      "Electrical Engineer",
      "Electronics Engineer",
      "Power Systems Engineer",
    ],
    startingSalary: 58000,
    medianSalary: 88000,
    experiencedSalary: 115000,
    jobAvailability: "High",
    testimonials: [], // No testimonials
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const dummyRoleModels = [
  {
    name: "Jane Doe",
    description: "An inspiring role model in engineering.",
    photoUrl: "https://example.com/photos/jane_doe.jpg",
    socialMediaLinks: {
      linkedin: "https://linkedin.com/in/jane-doe",
      instagram: "https://instagram.com/jane_doe",
    },
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    name: "John Smith",
    description: "A renowned figure in the field of software development.",
    photoUrl: "https://example.com/photos/john_smith.jpg",
    socialMediaLinks: {
      linkedin: "https://linkedin.com/in/john-smith",
      instagram: "https://instagram.com/john_smith",
    },
    createdAt: new Date("2024-01-02T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
  },
  {
    name: "Alice Johnson",
    description: "A leading advocate for diversity in STEM.",
    photoUrl: "https://example.com/photos/alice_johnson.jpg",
    socialMediaLinks: {
      linkedin: "https://linkedin.com/in/alice-johnson",
      instagram: "https://instagram.com/alice_johnson",
    },
    createdAt: new Date("2024-01-03T00:00:00Z"),
    updatedAt: new Date("2024-01-03T00:00:00Z"),
  },
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
  await populateNewQuiz();
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
  await Specialization.deleteMany({});
  await RankingQuestion.deleteMany({});
  await SliderQuestion.deleteMany({});
  await MCQQuestion.deleteMany({});

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
    console.log(
      `Spec Saveded _id${dbRoleModel._id}, name = ${dbRoleModel.name}`
    );
  }
}

async function populateNewQuiz() {
  try {
    // Create multiple sample MCQ questions
    const mcqQuestion1 = new MCQQuestion({
      questionText: "What is your preferred engineering field?",
      answerOptions: [
        { text: "Mechanical", weightings: { Mechanical: 10, Electrical: 5 } },
        { text: "Electrical", weightings: { Mechanical: 5, Electrical: 10 } },
      ],
    });

    const mcqQuestion2 = new MCQQuestion({
      questionText: "Which programming language do you prefer?",
      answerOptions: [
        { text: "Python", weightings: { Software: 10, Compsys: 8 } },
        { text: "Java", weightings: { Software: 7, Compsys: 9 } },
      ],
    });

    await mcqQuestion1.save();
    await mcqQuestion2.save();

    // Create multiple sample Ranking questions
    const rankingQuestion1 = new RankingQuestion({
      questionText: "Rank the following specializations",
      answerOptions: [
        {
          text: "Mechanical",
          weightings: {
            "1": 10,
            "2": 8,
            "3": 5,
            "4": 3,
          },
        },
        {
          text: "Electrical",
          weightings: {
            "1": 15,
            "2": 6,
            "3": 5,
            "4": 3,
          },
        },
      ],
    });

    const rankingQuestion2 = new RankingQuestion({
      questionText: "Rank the following jobs",
      answerOptions: [
        {
          text: "Civil Engineer",
          weightings: {
            "1": 8,
            "2": 6,
            "3": 5,
            "4": 3,
          },
        },
        {
          text: "Robot Building",
          weightings: {
            "1": 15,
            "2": 6,
            "3": 5,
            "4": 3,
          },
        },
      ],
    });

    await rankingQuestion1.save();
    await rankingQuestion2.save();

    // Create multiple sample Slider questions
    const sliderQuestion1 = new SliderQuestion({
      questionText: "Rate your interest in Mechanical Engineering from 1 to 10",
      sliderRange: {
        min: 1,
        max: 10,
        weightings: { Mechanical: [1, 5, 10], Mechatronics: [1, 3, 5, 10] },
      },
    });

    const sliderQuestion2 = new SliderQuestion({
      questionText: "Rate your comfort with coding from 1 to 10",
      sliderRange: {
        min: 1,
        max: 10,
        weightings: {
          "Software Engineering": [1, 3, 8, 10],
          Mechatronics: [1, 3, 5, 7],
          Compsys: [1, 3, 5, 6],
          Electrical: [1, 3, 5, 6],
        },
      },
    });

    await sliderQuestion1.save();
    await sliderQuestion2.save();

    // Create a quiz that references the created questions
    const quiz = new Quiz({
      quizName: "Engineering Specialization Quiz",
      quizQuestions: [
        mcqQuestion1._id,
        mcqQuestion2._id,
        rankingQuestion1._id,
        rankingQuestion2._id,
        sliderQuestion1._id,
        sliderQuestion2._id,
      ],
    });

    await quiz.save();
  } catch (error) {
    console.error("Error populating data:", error);
  }
}

run();
