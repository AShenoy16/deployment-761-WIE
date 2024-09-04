// MCQ interfaces
export interface IMCQAnswerOption {
  _id: string;
  text: string;
  weightings: { [specializationName: string]: number };
}

export interface IMCQQuestion {
  _id: string;
  questionType: "MCQ";
  questionText: string;
  answerOptions: IMCQAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
}

// Ranking interfaces
export interface IRankingWeights {
  _id: string;
  specializationName: string;
  weights: { [rank: string]: number };
}

export interface IRankingAnswerOption {
  _id: string;
  text: string;
  weightings: IRankingWeights[];
}

export interface IRankingQuestion {
  _id: string;
  questionType: "Ranking";
  questionText: string;
  answerOptions: IRankingAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
}

// Slider interfaces
export interface ISliderRange {
  min: number;
  max: number;
  weightings: { [specializationName: string]: number[] };
}

export interface ISliderQuestion {
  _id: string;
  questionType: "Slider";
  questionText: string;
  sliderRange: ISliderRange;
  createdAt: Date;
  updatedAt: Date;
}

// General quiz types
export type IQuestion = IMCQQuestion | IRankingQuestion | ISliderQuestion;

export type Quiz = {
  quizName: string;
  quizQuestions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
};
