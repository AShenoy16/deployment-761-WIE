import mongoose, { Schema, Document } from 'mongoose';
import { IRankingQuestion, IRankingAnswerOption } from './interfaces';


const rankingAnswerOptionSchema: Schema = new Schema({
  optionId: { type: String, required: true },
  text: { type: String, required: true },
  weightings: { required: true, type: Map, of: Map },
});

const rankingQuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true },
  questionNumber: { type: Number, required: true },
  answerOptions: {
    type: [rankingAnswerOptionSchema],
    validate: {
      validator: function(v: Array<any>) {
        return v.length > 0; // Ensure at least one answer option
      },
      message: 'Ranking must have at least one answer option.'
    },
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RankingQuestion = mongoose.model<IRankingQuestion>('RankingQuestion', rankingQuestionSchema);
export default RankingQuestion;
