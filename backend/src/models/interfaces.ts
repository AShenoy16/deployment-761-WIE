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
