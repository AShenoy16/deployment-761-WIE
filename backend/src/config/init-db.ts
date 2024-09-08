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
      "Software Tester",
      "Database Administrator",
      "Systems Analyst",
    ],
    startingSalary: 60000,
    medianSalary: 90000,
    experiencedSalary: 120000,
    jobAvailability: "High",
    testimonials: [dummyTestimonials[0], dummyTestimonials[1]], // Include some testimonials
    header:
      "Software engineers are problem-solvers who design, develop, and optimize software systems that power the digital world.",
    leftDetail:
      "Software engineering is an innovative field that combines creativity and problem-solving to build the technology we use every day.",
    rightDetail:
      "As a software engineer, you have the opportunity to make a significant impact by creating solutions that improve people's lives and businesses.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Biomedical Engineering",
    description: "Apply engineering principles to the medical field.",
    photoUrl: "https://example.com/biomedical-engineering.jpg",
    careerPathways: [
      "Clinical Engineer",
      "Biomedical Researcher",
      "Medical Device Engineer",
      "Biomechanics Engineer",
      "Rehabilitation Engineer",
    ],
    startingSalary: 55000,
    medianSalary: 85000,
    experiencedSalary: 110000,
    jobAvailability: "Medium",
    testimonials: [dummyTestimonials[1], dummyTestimonials[2]],
    header:
      "Biomedical engineers are problem-solvers who combine medicine and engineering to improve healthcare systems and devices.",
    leftDetail:
      "Biomedical engineering combines the design and problem-solving skills of engineering with medical and biological sciences.",
    rightDetail:
      "Biomedical engineers work to advance the field of healthcare by developing cutting-edge devices, prosthetics, and diagnostic equipment.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Chemical and Materials Engineering",
    description:
      "Apply chemistry and materials science to develop new processes and products.",
    photoUrl: "https://example.com/chemical-engineering.jpg",
    careerPathways: [
      "Process Engineer",
      "Materials Engineer",
      "Chemical Plant Engineer",
      "Research Scientist",
      "Environmental Engineer",
    ],
    startingSalary: 57000,
    medianSalary: 88000,
    experiencedSalary: 115000,
    jobAvailability: "High",
    testimonials: [dummyTestimonials[0]],
    header:
      "Chemical and Materials engineers focus on transforming raw materials into useful products and improving material properties.",
    leftDetail:
      "Chemical and materials engineering plays a vital role in industries like pharmaceuticals, energy, and manufacturing.",
    rightDetail:
      "These engineers develop and refine materials and chemical processes that make new products and improve existing technologies.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Civil Engineering",
    description: "Design and construct infrastructure projects.",
    photoUrl: "https://example.com/civil-engineering.jpg",
    careerPathways: [
      "Structural Engineer",
      "Project Manager",
      "Urban Planner",
      "Transportation Engineer",
      "Geotechnical Engineer",
    ],
    startingSalary: 55000,
    medianSalary: 85000,
    experiencedSalary: 110000,
    jobAvailability: "Medium",
    testimonials: [dummyTestimonials[2]],
    header:
      "Civil engineers are responsible for designing and building the infrastructure that supports modern society.",
    leftDetail:
      "Civil engineering involves creating structures like roads, bridges, and buildings while considering sustainability and safety.",
    rightDetail:
      "These engineers ensure that our cities and infrastructure are built to last and meet the needs of growing populations.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Computer Systems Engineering",
    description:
      "Integrate hardware and software to create efficient computer systems.",
    photoUrl: "https://example.com/computer-systems-engineering.jpg",
    careerPathways: [
      "System Architect",
      "Embedded Systems Engineer",
      "Control Systems Engineer",
      "Network Engineer",
      "IoT Engineer",
    ],
    startingSalary: 60000,
    medianSalary: 90000,
    experiencedSalary: 120000,
    jobAvailability: "High",
    testimonials: [dummyTestimonials[1], dummyTestimonials[2]],
    header:
      "Computer systems engineers design and develop complex hardware and software systems that drive modern technology.",
    leftDetail:
      "Computer systems engineering focuses on the interaction between software and hardware in various devices and systems.",
    rightDetail:
      "These engineers work to ensure that the devices and systems we rely on daily operate smoothly and efficiently.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
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
      "Communications Engineer",
      "Control Engineer",
    ],
    startingSalary: 58000,
    medianSalary: 88000,
    experiencedSalary: 115000,
    jobAvailability: "High",
    testimonials: [],
    header:
      "Electrical engineers design, develop, and maintain electrical systems, from small devices to large power networks.",
    leftDetail:
      "Electrical engineering covers everything from microchips to power generation, ensuring efficient electrical systems.",
    rightDetail:
      "These engineers play a key role in industries like telecommunications, power, and electronics, advancing technology and efficiency.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Engineering Science",
    description:
      "An interdisciplinary field that applies mathematical and scientific principles to solve engineering problems.",
    photoUrl: "https://example.com/engineering-science.jpg",
    careerPathways: [
      "Research Scientist",
      "Systems Engineer",
      "Data Scientist",
      "Operations Research Analyst",
      "Engineering Analyst",
    ],
    startingSalary: 59000,
    medianSalary: 87000,
    experiencedSalary: 115000,
    jobAvailability: "High",
    testimonials: [],
    header:
      "Engineering Science provides a foundation for solving complex problems using scientific and mathematical approaches.",
    leftDetail:
      "This interdisciplinary field allows engineers to tackle challenges in a variety of industries, including healthcare and energy.",
    rightDetail:
      "Engineering scientists are often at the forefront of innovation, helping to develop new technologies and solutions.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mechanical Engineering",
    description:
      "Design, build, and maintain mechanical systems in a variety of industries.",
    photoUrl: "https://example.com/mechanical-engineering.jpg",
    careerPathways: [
      "Mechanical Engineer",
      "Automotive Engineer",
      "Robotics Engineer",
      "Aerospace Engineer",
      "Manufacturing Engineer",
    ],
    startingSalary: 57000,
    medianSalary: 88000,
    experiencedSalary: 115000,
    jobAvailability: "High",
    testimonials: [dummyTestimonials[1], dummyTestimonials[2]],
    header:
      "Mechanical engineers design and build mechanical systems and products that power our world.",
    leftDetail:
      "Mechanical engineering involves creating machines, tools, and equipment that improve industries from transportation to healthcare.",
    rightDetail:
      "Mechanical engineers play a critical role in improving efficiency, safety, and sustainability in a variety of industries.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Mechatronics Engineering",
    description:
      "Combine mechanical, electrical, and software engineering to create intelligent systems.",
    photoUrl: "https://example.com/mechatronics-engineering.jpg",
    careerPathways: [
      "Mechatronics Engineer",
      "Automation Engineer",
      "Robotics Engineer",
      "Systems Engineer",
      "Product Development Engineer",
    ],
    startingSalary: 59000,
    medianSalary: 88000,
    experiencedSalary: 120000,
    jobAvailability: "High",
    testimonials: [dummyTestimonials[0]],
    header:
      "Mechatronics engineers create intelligent systems by integrating mechanical, electrical, and software engineering.",
    leftDetail:
      "Mechatronics engineering focuses on developing smart technologies, including robots, automated systems, and smart devices.",
    rightDetail:
      "Mechatronics engineers play a crucial role in creating new technologies that automate and improve processes across industries.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Structural Engineering",
    description:
      "Specialize in the design and analysis of structures that support or resist loads.",
    photoUrl: "https://example.com/structural-engineering.jpg",
    careerPathways: [
      "Structural Engineer",
      "Construction Engineer",
      "Bridge Engineer",
      "Seismic Engineer",
      "Building Systems Engineer",
    ],
    startingSalary: 55000,
    medianSalary: 85000,
    experiencedSalary: 115000,
    jobAvailability: "Medium",
    testimonials: [dummyTestimonials[1], dummyTestimonials[2]],
    header:
      "Structural engineers ensure that structures are safe, stable, and able to withstand the forces they are subjected to.",
    leftDetail:
      "Structural engineering focuses on designing and analyzing buildings, bridges, and other structures to ensure their integrity and safety.",
    rightDetail:
      "Structural engineers play a key role in ensuring that the infrastructure and buildings we use daily are safe and durable.",
    rightImage: "/engineering-building.jpg",
    leftImage: "/engineering-building.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];


const dummyRoleModels = [
  {
    name: "Alyssa Morris",
    title: "Product Manager, Intel",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://www.womeninscience.africa/wp-content/uploads/2022/11/Unsung-Black-Female-Engineers.jpg",
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/alyssamorris",
    },
    createdAt: new Date("2024-01-03T00:00:00Z"),
    updatedAt: new Date("2024-01-03T00:00:00Z"),
  },
  {
    name: "Samantha Smith",
    title: "Software Engineer, Google",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://nzmanufacturer.co.nz/wp-content/uploads/2023/08/Women-In-Engineering-PIC.jpg",
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/samanthasmith",
    },
    createdAt: new Date("2024-01-03T00:00:00Z"),
    updatedAt: new Date("2024-01-03T00:00:00Z"),
  },
  {
    name: "Jane Doe",
    title: "Software Engineer, Meta",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://nzmanufacturer.co.nz/wp-content/uploads/2023/08/Women-In-Engineering-PIC.jpg",
    bio: "Jane Doe is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/janedoe",
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
  await RoleModel.deleteMany({});

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
          text: "Sky Diving",
          weightings: [
            {
              specializationName: "Mechanical",
              weights: { "1": 10, "2": 8, "3": 5, "4": 0 },
            },
            {
              specializationName: "Electrical",
              weights: { "1": 10, "2": 8, "3": 5, "4": 0 },
            },
            {
              specializationName: "Software",
              weights: { "1": 15, "2": 8, "3": 5, "4": 0 },
            },
            {
              specializationName: "Compsys",
              weights: { "1": 20, "2": 8, "3": 5, "4": 0 },
            },
          ],
        },
        {
          text: "Soldering",
          weightings: [
            {
              specializationName: "Mechanical",
              weights: { "1": 10, "2": 8, "3": 5, "4": 0 },
            },
            {
              specializationName: "Electrical",
              weights: { "1": 10, "2": 8, "3": 5, "4": 0 },
            },
            {
              specializationName: "Software",
              weights: { "1": 15, "2": 8, "3": 5, "4": 0 },
            },
            {
              specializationName: "Compsys",
              weights: { "1": 20, "2": 8, "3": 5, "4": 0 },
            },
          ],
        },
      ],
    });

    // const rankingQuestion2 = new RankingQuestion({
    //   questionText: "Rank the following jobs",
    //   answerOptions: [
    //     {
    //       text: "Civil Engineer",
    //       weightings: {
    //         "1": 8,
    //         "2": 6,
    //         "3": 5,
    //         "4": 3,
    //       },
    //     },
    //     {
    //       text: "Robot Building",
    //       weightings: {
    //         "1": 15,
    //         "2": 6,
    //         "3": 5,
    //         "4": 3,
    //       },
    //     },
    //   ],
    // });

    await rankingQuestion1.save();
    // await rankingQuestion2.save();

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
          Software: [1, 3, 8, 10],
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
        // rankingQuestion2._id,
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
