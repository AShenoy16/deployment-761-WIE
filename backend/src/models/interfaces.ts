// MCQ interfaces
export interface IMCQAnswerOption {
  text: string;
  _id: string;
  // map of specname as string to number
  weightings: { [specializationName: string]: number };
}

export interface IMCQQuestion extends Document {
  questionType: "mcq";
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
  questionType: "ranking";
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
  questionType: "slider";
  questionText: string;
  _id: string;
  sliderRange: ISliderWeights;
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
