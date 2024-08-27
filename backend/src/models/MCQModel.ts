import mongoose, { Schema, Document } from 'mongoose';
import {IMCQQuestion, IMCQAnswerOption } from './interfaces';


const mcqAnswerOptionSchema: Schema = new Schema({
  optionId: { type: String, required: true },
  text: { type: String, required: true },
  weightings: { required: true, type: Map, of: Number },
});

const mcqQuestionSchema: Schema = new Schema({
  questionType: "MCQ",
  questionText: { type: String, required: true },
  questionNumber: { type: Number, required: true },
  answerOptions: {
    type: [mcqAnswerOptionSchema],
    validate: {
      validator: function(v: Array<any>) {
        return v.length > 0; // Ensure at least one answer option
      },
      message: 'A MCQ question must have at least one answer option.'
    },
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const MCQQuestion = mongoose.model<IMCQQuestion>('MCQQuestion', mcqQuestionSchema);
export default MCQQuestion;
