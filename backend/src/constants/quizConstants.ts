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
