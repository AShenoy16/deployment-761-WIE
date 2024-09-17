import { useQuizStore } from "../stores/QuizStore";
import { useMCQQuestionStore } from "../stores/MCQQuestionStore";
import { useRankingQuestionStore } from "../stores/RankingQuizQuestionStore";
import { useSliderQuestionStore } from "../stores/SliderQuizQuestionStore";

export const possibleSpecs = [
  "Biomedical",
  "Chemmat",
  "Civil",
  "Compsys",
  "Electrical",
  "Engsci",
  "Mechanical",
  "Mechatronics",
  "Software",
  "Structural",
];

export const specAbbreviationMap: { [abbreviation: string]: string } = {
  Biomedical: "Biomedical Engineering",
  Chemmat: "Chemical and Materials Engineering",
  Civil: "Civil Engineering",
  Compsys: "Computer Systems Engineering",
  Electrical: "Electrical Engineering",
  Engsci: "Engineering Science",
  Mechanical: "Mechanical Engineering",
  Mechatronics: "Mechatronics Engineering",
  Software: "Software Engineering",
  Structural: "Structural Engineering",
};

export const reverseSpecAbbreviationMap: { [fullName: string]: string } =
  Object.entries(specAbbreviationMap).reduce(
    (acc, [abbreviation, fullName]) => {
      acc[fullName] = abbreviation;
      return acc;
    },
    {} as { [abbreviation: string]: string }
  );

export const resetQuizProgress = () => {
  const resetQuiz = useQuizStore.getState().resetQuiz;
  const resetMCQ = useMCQQuestionStore.getState().resetMcqQuestionProgress;
  const resetRanking =
    useRankingQuestionStore.getState().resetRankingQuestionProgress;
  const resetSlider =
    useSliderQuestionStore.getState().resetSliderQuestionProgress;

  resetQuiz();
  resetMCQ();
  resetRanking();
  resetSlider();
};
