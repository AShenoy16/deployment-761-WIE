export interface QuizSubmissionRequest {
  mcqAnswers: { [questionNumber: string]: string }; // i.e., question id mapped to id of option selected
  sliderAnswers: { [questionNumber: string]: number }; // i.e., question number mapped to number of slider
  rankingAnswers: {
    [questionNumber: string]: { rankings: { [optionId: string]: number } }; // i.e., question number mapped to a nested map which maps each option to the rank they were given
  };
}

export type QuizResults = {
  specResults: { [specName: string]: number };
}
