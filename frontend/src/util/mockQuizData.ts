import { IQuestion } from "../types/QuestionTypes";

const mockQuestions: IQuestion[] = [
  // MCQ Questions
  {
    _id: "mcq1",
    questionType: "MCQ",
    questionText: "Which field interests you the most?",
    answerOptions: [
      {
        _id: "opt1",
        text: "Software Development",
        weightings: { Software: 10, Compsys: 7 },
      },
      {
        _id: "opt2",
        text: "Circuit Design",
        weightings: { Electrical: 9, Biomedical: 5 },
      },
      {
        _id: "opt3",
        text: "Building Structures",
        weightings: { Civil: 8, Structural: 9 },
      },
      {
        _id: "opt4",
        text: "Material Science",
        weightings: { Chemmat: 7, Engsci: 4 },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "mcq2",
    questionType: "MCQ",
    questionText: "Which skill do you want to improve?",
    answerOptions: [
      {
        _id: "opt5",
        text: "Programming",
        weightings: { Software: 8, Compsys: 5 },
      },
      {
        _id: "opt6",
        text: "Automation",
        weightings: { Mechanical: 7, Mechatronics: 10 },
      },
      {
        _id: "opt7",
        text: "Material Science",
        weightings: { Chemmat: 9, Engsci: 4 },
      },
      {
        _id: "opt8",
        text: "Electrical Systems",
        weightings: { Electrical: 8, Biomedical: 5 },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Ranking Questions
  {
    _id: "rank1",
    questionType: "Ranking",
    questionText: "Rank the most appealing engineering disciplines.",
    answerOptions: [
      {
        _id: "opt9",
        text: "Software Engineering",
        weightings: [
          {
            _id: "rank1_weight",
            specializationName: "Software",
            weights: { "1": 10, "2": 5, "3": 3 },
          },
        ],
      },
      {
        _id: "opt10",
        text: "Mechanical Engineering",
        weightings: [
          {
            _id: "rank2_weight",
            specializationName: "Mechanical",
            weights: { "1": 8, "2": 6, "3": 4 },
          },
        ],
      },
      {
        _id: "opt11",
        text: "Civil Engineering",
        weightings: [
          {
            _id: "rank3_weight",
            specializationName: "Civil",
            weights: { "1": 9, "2": 7, "3": 5 },
          },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "rank2",
    questionType: "Ranking",
    questionText: "Rank these areas based on your interest.",
    answerOptions: [
      {
        _id: "opt12",
        text: "Electrical Systems",
        weightings: [
          {
            _id: "rank4_weight",
            specializationName: "Electrical",
            weights: { "1": 10, "2": 6, "3": 4 },
          },
        ],
      },
      {
        _id: "opt13",
        text: "Biomedical Engineering",
        weightings: [
          {
            _id: "rank5_weight",
            specializationName: "Biomedical",
            weights: { "1": 8, "2": 5, "3": 3 },
          },
        ],
      },
      {
        _id: "opt14",
        text: "Structural Engineering",
        weightings: [
          {
            _id: "rank6_weight",
            specializationName: "Structural",
            weights: { "1": 9, "2": 7, "3": 5 },
          },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Slider Questions
  {
    _id: "slider1",
    questionType: "Slider",
    questionText: "Rate your confidence in problem-solving (1-5).",
    sliderRange: {
      min: 1,
      max: 5,
      weightings: {
        Engsci: [1, 2, 3, 4, 5],
        Biomedical: [2, 3, 4, 5],
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "slider2",
    questionType: "Slider",
    questionText: "How excited are you about automation (1-5)?",
    sliderRange: {
      min: 1,
      max: 5,
      weightings: {
        Mechatronics: [1, 2, 3, 4, 5],
        Mechanical: [2, 3, 4, 5],
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock API function
export const mockFetchQuizQuestions = async (): Promise<IQuestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockQuestions);
    }, 1000);
  });
};
