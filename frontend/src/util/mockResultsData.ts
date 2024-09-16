import { SpecSummary } from "../types/Specialization";

const mockResultsData: SpecSummary[] = [
  {
    name: "Software Engineering",
    description: "Software Engineers are problem solvers",
    careerPathways: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "DevOps Engineer",
      "Software Architect",
    ],
  },
  {
    name: "Computer Systems Engineering",
    description: "Software Engineers are problem solvers",
    careerPathways: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "DevOps Engineer",
      "Software Architect",
    ],
  },
  {
    name: "Electrical Engineering",
    description: "Software Engineers are problem solvers",
    careerPathways: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "DevOps Engineer",
      "Software Architect",
    ],
  },
];

// Mock API function, simulates getting quiz results
export const mockGetQuizResults = async (): Promise<SpecSummary[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResultsData);
    }, 1000);
  });
};
