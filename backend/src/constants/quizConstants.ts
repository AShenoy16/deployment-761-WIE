import { QuizResults } from "../types/quizTypes";

const initialSpecResults: QuizResults = {
  specResults: {
    Software: 0,
    Electrical: 0,
    Civil: 0,
    Compsys: 0,
    Structural: 0,
    Chemmat: 0,
    Mechanical: 0,
    Mechatronics: 0,
    Engsci: 0,
    Biomedical: 0,
  },
};

const resetMap = () => {
  for (const key in initialSpecResults.specResults) {
    initialSpecResults.specResults[key] = 0;
  }
};

// Function to return a fresh copy of specResults
export const getInitialSpecResults = () => {
  resetMap();
  return { ...initialSpecResults }; // Return a new copy of the object
};

export const defaultQuizQuestions = {
  mcq: {
    questionText: "New Example: What is your preferred engineering field?",
    answerOptions: [
      { text: "Mechanical", weightings: { Mechanical: 10, Electrical: 5 } },
      { text: "Electrical", weightings: { Mechanical: 5, Electrical: 10 } },
      { text: "Software", weightings: { Software: 10, Compsys: 8 } },
      { text: "Civil", weightings: { Civil: 10, Structural: 7 } },
    ],
  },

  slider: {
    questionText:
      "New Example: Rate your interest in Mechanical Engineering from 1 to 10",
    sliderWeights: {
      weightings: { Mechanical: 5, Mechatronics: 3, Software: 7, Compsys: 4 },
    },
  },

  ranking: {
    questionText: "New Example: Rank the following jobs",
    answerOptions: [
      {
        text: "Car Building",
        weightings: {
          Mechanical: 8,
          Electrical: 6,
          Software: 5,
          Compsys: 3,
        },
      },
      {
        text: "Robot Building",
        weightings: {
          Mechanical: 10,
          Electrical: 6,
          Software: 5,
          Compsys: 3,
        },
      },
      {
        text: "Road Building",
        weightings: {
          Civil: 10,
          Structural: 8,
        },
      },
    ],
  },
};

export const specAbbreviationMap: { [abbreviation: string]: string } = {
  Software: "Software Engineering",
  Electrical: "Electrical Engineering",
  Civil: "Civil Engineering",
  Compsys: "Computer Systems Engineering",
  Structural: "Structural Engineering",
  Chemmat: "Chemical and Materials Engineering",
  Mechanical: "Mechanical Engineering",
  Mechatronics: "Mechatronics Engineering",
  Engsci: "Engineering Science",
  Biomedical: "Biomedical Engineering",
};
