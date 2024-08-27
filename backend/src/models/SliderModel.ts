import mongoose, { Schema, Document } from 'mongoose';
import { ISliderRange, ISliderQuestion } from './interfaces';

const sliderRangeSchema: Schema = new Schema({
  sliderId: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  weightings: { required: true, type: Map, of: [Number] },
});

const sliderQuestionSchema: Schema = new Schema({
  questionType: "Slider",
  questionText: { type: String, required: true },
  questionNumber: { type: Number, required: true },
  sliderRange: {required: true, type: sliderRangeSchema},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SliderQuestion = mongoose.model<ISliderQuestion>('SliderQuestion', sliderQuestionSchema);
export default SliderQuestion;
