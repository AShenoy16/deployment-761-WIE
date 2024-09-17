export type Specialization = {
  name: string;
  description: string;
  photoUrl: string;
  careerPathways: string[];
  testimonials: Testimonial[];
  startingSalary: number;
  medianSalary: number;
  experiencedSalary: number;
  jobAvailability: string;
  header: string;
  leftDetail: string;
  rightDetail: string;
  leftImage: string;
  rightImage: string;
};

export type Testimonial = {
  name: string;
  description: string;
};

export type SpecSummary = Pick<
  Specialization,
  "name" | "description" | "careerPathways"
>;
