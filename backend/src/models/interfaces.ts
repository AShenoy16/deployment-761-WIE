// MCQ interfaces
export interface IMCQAnswerOption {
  text: string;
  _id: string;
  // map of specname as string to number
  weightings: { [specializationName: string]: number };
}

export interface IMCQQuestion extends Document {
  questionType: "MCQ";
  questionText: string;
  _id: string;
  answerOptions: IMCQAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
}

// Ranking interfaces
export interface IRankingAnswerOption {
  text: string;
  _id: string;
  // map of specName to currentWeight
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

export interface ISliderQuestion extends Document {
  questionType: "Slider";
  questionText: string;
  _id: string;
  sliderWeights: ISliderWeights;
  createdAt: Date;
  updatedAt: Date;
}

// Define the interface for the multiplier data
export interface IMultiplierData extends Document {
  _id: string;
  rank2Multiplier: number;
  rank3Multiplier: number;
  sliderFactor: number;
}

// General quiz interface
export type IQuestion = IMCQQuestion | IRankingQuestion | ISliderQuestion;

export interface IQuiz extends Document {
  quizName: string;
  quizQuestions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonial extends Document {
  testimonialId: string;
  name: string;
  description: string;
}

export interface Specialization extends Document {
  name: string;
  description: string;
  photoUrl: string;
  careerPathways: string[];
  startingSalary: number;
  medianSalary: number;
  experiencedSalary: number;
  jobAvailability: string;
  testimonials: ITestimonial[];
  header: string;
  leftDetail: string;
  rightDetail: string;
  rightImage: string;
  leftImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISocialMediaLinks {
  linkedin: string;
}

export interface IRoleModel extends Document {
  name: string;
  description: string;
  bio: string;
  photoUrl: string;
  socialMediaLinks: ISocialMediaLinks;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
}
