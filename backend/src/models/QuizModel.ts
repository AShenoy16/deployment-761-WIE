import mongoose, { Schema, Document } from 'mongoose';
import { IQuiz, IQuestion, IMCQQuestion, IRankingQuestion, ISliderQuestion } from './interfaces';


const quizSchema: Schema = new Schema<IQuiz>({
  quizName: { type: String, required: true },
  quizQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'questionType'

    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
export default Quiz;
