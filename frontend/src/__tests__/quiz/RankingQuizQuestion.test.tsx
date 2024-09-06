import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RankingQuizQuestion } from "../../components/quiz/RankingQuizQuestion";
import { useRankingQuestionStore } from "../../stores/RankingQuizQuestionStore";
import { IRankingQuestion } from "../../types/QuestionTypes";
import { mockQuestions } from "../../util/mockQuizData";

const mockRankingQuestion: IRankingQuestion =
  mockQuestions[2] as IRankingQuestion;

const questionId = mockRankingQuestion._id;
const firstOptId = mockRankingQuestion.answerOptions[0]._id;
const secondOptId = mockRankingQuestion.answerOptions[1]._id;

describe("RankingQuizQuestion Component", () => {
  beforeEach(() => {
    useRankingQuestionStore.setState({ questionRankings: {} });
  });

  it("renders the question and options correctly", () => {
    render(<RankingQuizQuestion question={mockRankingQuestion} />);

    // Check if the question text is rendered
    expect(
      screen.getByText(mockRankingQuestion.questionText)
    ).toBeInTheDocument();

    // Check if all options are rendered
    mockRankingQuestion.answerOptions.forEach((option) => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  it("updates the store when a ranking is selected", () => {
    render(<RankingQuizQuestion question={mockRankingQuestion} />);

    // Simulate clicking on the first rank circle for the first option
    const rank1ButtonForOption1 = screen.getAllByRole("ranking-button")[0];
    fireEvent.click(rank1ButtonForOption1);

    // Check if the store was updated correctly
    const state = useRankingQuestionStore.getState();
    expect(state.questionRankings[questionId][firstOptId]).toBe(1);
  });

  it("enforces unique rankings across options", () => {
    render(<RankingQuizQuestion question={mockRankingQuestion} />);

    // Click on the first ranking circle for the first option
    const rank1ButtonForOption1 = screen.getAllByRole("ranking-button")[0];
    fireEvent.click(rank1ButtonForOption1);

    // Click on the first ranking circle for the second option
    const rank1ButtonForOption2 = screen.getAllByRole("ranking-button")[3];
    fireEvent.click(rank1ButtonForOption2);

    // Check that the second option has the first rank, and the first option no longer has it
    const state = useRankingQuestionStore.getState();
    expect(state.questionRankings[questionId][firstOptId]).toBeUndefined();
    expect(state.questionRankings[questionId][secondOptId]).toBe(1);
  });
});
