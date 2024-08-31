export interface QuizSubmissionRequest {
  mcqAnswers: { [questionNumber: number]: string }; // i.e., question number mapped to id of option selected
  sliderAnswers: { [questionNumber: number]: number }; // i.e., question number mapped to number of slider
  rankingAnswers: {
    [questionNumber: number]: { rankings: { [optionId: string]: number } }; // i.e., question number mapped to a nested map which maps each option to the rank they were given
  };
}

export type QuizResults = {
  specResults: { [specName: string]: number };
}
