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
export interface IRankingAnswerOption {
  _id: string;
  text: string;
  weightings: { [specializationName: string]: number };
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
export interface ISliderWeights {
  _id: string;
  weightings: { [specializationName: string]: number };
}

export interface ISliderQuestion {
  _id: string;
  questionType: "Slider";
  questionText: string;
  sliderWeights: ISliderWeights;
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

// Define the interface for the multiplier data
export interface IMultiplierData {
  rank2Multiplier: number;
  rank3Multiplier: number;
  sliderFactor: number;
}
