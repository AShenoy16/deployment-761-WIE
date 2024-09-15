import mongoose, { Schema, Document } from 'mongoose';
import { ISliderQuestion, ISliderWeights } from './interfaces';

const sliderWeightsSchema: Schema = new Schema({
  weightings: { required: true, type: Map, of: Number },
});

const sliderQuestionSchema: Schema = new Schema({
  questionType: { type: String, default: "Slider", required: true },
  questionText: { type: String, required: true },
  sliderWeights: {type: sliderWeightsSchema, required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SliderQuestion = mongoose.model<ISliderQuestion>('SliderQuestion', sliderQuestionSchema);
export default SliderQuestion;
