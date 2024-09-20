import mongoose, { Schema, Document } from "mongoose";

interface ICard {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface IHomePage extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  section1Header: string;
  section1Text: string;
  section2Header: string;
  section2Text: string;
  additionalResources: ICard[];
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
});

const HomePageSchema = new Schema<IHomePage>({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroImage: { type: String, required: true },
  section1Header: { type: String, required: true },
  section1Text: { type: String, required: true },
  section2Header: { type: String, required: true },
  section2Text: { type: String, required: true },
  additionalResources: [CardSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const HomePage = mongoose.model<IHomePage>("HomePage", HomePageSchema);
export default HomePage;
