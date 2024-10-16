import { ObjectId } from "mongoose";

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
export interface IMultiplierData {
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
  _id: string | ObjectId;
  testimonialId: string;
  name: string;
  description: string;
}

export interface ISpecialization extends Document {
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
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISocialMediaLinks {
  linkedin: string;
}

export interface IRoleModel {
  name: string;
  description: string;
  title: string;
  specName: string;
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

export interface IHighschoolRequirement {
  _id: string;
  title: string;
  requiredScore: number;
  requirements: string[];         
}
