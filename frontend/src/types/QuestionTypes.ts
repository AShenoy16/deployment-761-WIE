// MCQ types
export type MCQAnswerOption = {
  optionId: string;
  text: string;
  weightings: { [specializationName: string]: number };
};

export type MCQQuestion = {
  type: "mcq";
  questionText: string;
  questionNumber: number;
  answerOptions: MCQAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
};

// Ranking types
export type RankingAnswerOption = {
  optionId: string;
  text: string;
  weightings: { [specializationName: string]: { [rank: number]: number } };
};

export type RankingQuestion = {
  type: "ranking";
  questionText: string;
  questionNumber: number;
  answerOptions: RankingAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
};

// Slider types
export type SliderRange = {
  sliderId: string;
  min: number;
  max: number;
  weightings: { [specializationName: string]: number[] };
};

export type SliderQuestion = {
  type: "slider";
  questionText: string;
  questionNumber: number;
  sliderRange: SliderRange;
  createdAt: Date;
  updatedAt: Date;
};

// General quiz types
export type Question = MCQQuestion | RankingQuestion | SliderQuestion;

export type Quiz = {
  quizName: string;
  quizQuestions: Question[];
  createdAt: Date;
  updatedAt: Date;
};
