export type Specialization = {
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
};

export type Testimonial = {
  name: string;
  description: string;
};

export type SpecSummary = Pick<
  Specialization,
  "name" | "description" | "careerPathways"
>;
