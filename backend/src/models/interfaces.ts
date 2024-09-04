// MCQ interfaces

export interface IMCQAnswerOption {
  text: string;
  _id: string
  // map of specname as string to number
  weightings: { [specializationName: string]: number };
}

export interface IMCQQuestion extends Document {
  questionType: "MCQ";
  questionText: string;
  questionId: string;
  answerOptions: IMCQAnswerOption[];
  createdAt: Date;
  updatedAt: Date;
}

// Ranking interfaces

export interface IRankingAnswerOption {
  text: string;
  _id: string
  // map of rank to rank to weight
  weightings: { [specializationName: string]: { [rank: number]: number } };
}

export interface IRankingQuestion extends Document {
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

export interface ISliderQuestion extends Document {
  questionType: "Slider";
  questionText: string;
  questionId: string;
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

export interface Testimonial extends Document {
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
  testimonials: Testimonial[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISocialMediaLinks {
  linkedin: string;
  instagram: string;
}

export interface IRoleModel extends Document {
  name: string;
  description: string;
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
