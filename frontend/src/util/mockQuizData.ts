import { Question } from "../types/QuestionTypes";

// Mock data
const mockQuestions: Question[] = [
  {
    type: "mcq",
    questionText: "What is your preferred programming language?",
    questionNumber: 1,
    answerOptions: [
      {
        optionId: "1",
        text: "JavaScript",
        weightings: { frontend: 10, backend: 5 },
      },
      {
        optionId: "2",
        text: "Python",
        weightings: { dataScience: 10, backend: 7 },
      },
      { optionId: "3", text: "Java", weightings: { backend: 10, mobile: 8 } },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "mcq",
    questionText: "Which cloud platform do you prefer?",
    questionNumber: 2,
    answerOptions: [
      { optionId: "1", text: "AWS", weightings: { cloud: 10, devOps: 8 } },
      { optionId: "2", text: "Azure", weightings: { cloud: 9, enterprise: 7 } },
      {
        optionId: "3",
        text: "Google Cloud",
        weightings: { cloud: 8, dataScience: 9 },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "ranking",
    questionText: "Rank these languages based on your preference.",
    questionNumber: 3,
    answerOptions: [
      {
        optionId: "1",
        text: "JavaScript",
        weightings: { frontend: { 1: 10, 2: 5, 3: 2 } },
      },
      {
        optionId: "2",
        text: "Python",
        weightings: { dataScience: { 1: 10, 2: 7, 3: 3 } },
      },
      {
        optionId: "3",
        text: "Java",
        weightings: { backend: { 1: 10, 2: 8, 3: 4 } },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "ranking",
    questionText: "Rank these operating systems based on your experience.",
    questionNumber: 4,
    answerOptions: [
      {
        optionId: "1",
        text: "Windows",
        weightings: { enterprise: { 1: 10, 2: 7, 3: 4 } },
      },
      {
        optionId: "2",
        text: "Linux",
        weightings: { devOps: { 1: 10, 2: 8, 3: 5 } },
      },
      {
        optionId: "3",
        text: "macOS",
        weightings: { frontend: { 1: 10, 2: 6, 3: 3 } },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "slider",
    questionText: "Rate your proficiency in JavaScript.",
    questionNumber: 5,
    sliderRange: {
      sliderId: "1",
      min: 0,
      max: 10,
      weightings: { frontend: [0, 10], backend: [0, 5] },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    type: "slider",
    questionText: "Rate your interest in cloud computing.",
    questionNumber: 6,
    sliderRange: {
      sliderId: "2",
      min: 0,
      max: 10,
      weightings: { cloud: [0, 10], devOps: [0, 7] },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock API function
export const mockFetchQuizQuestions = async (): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuestions);
    }, 1000);
  });
};
