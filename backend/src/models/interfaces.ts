// MCQ interfaces

export interface IMCQAnswerOption {
  optionId: string;
  text: string;
  // map of specname as string to number
  weightings: { [specializationName: string]: number };
}

export interface IMCQQuestion extends Document {
  questionType: "MCQ";
  questionText: string;
  questionNumber: number;
  answerOptions: IMCQAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
}

// Ranking interfaces

export interface IRankingAnswerOption {
  optionId: string;
  text: string;
  // map of spec names to rank and weight
  weightings: { [specializationName: string]: { [rank: number]: number } };
}

export interface IRankingQuestion extends Document {
  questionType: "Ranking";
  questionText: string;
  questionNumber: number;
  answerOptions: IRankingAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
}

// Slider interfaces

export interface ISliderRange {
  sliderId: string;
  min: number;
  max: number;
  weightings: { [specializationName: string]: number[] };
}

export interface ISliderQuestion extends Document {
  questionType: "Slider";
  questionText: string;
  questionNumber: number;
  sliderRange: ISliderRange;
  createdAt: Date;
  updatedAt: Date;
}

// General quiz interface
export type IQuestion = IMCQQuestion | IRankingQuestion | ISliderQuestion;

export interface IQuiz extends Document {
  quizName: string;
  quizQuestions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}
