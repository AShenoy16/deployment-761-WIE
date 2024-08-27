import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { RankingQuizQuestion } from "../../components/quiz/RankingQuizQuestion";
import { useRankingStore } from "../../stores/RankingQuizQuestionStore";
import { RankingQuestion } from "../../types/QuestionTypes";

const rankingQuestion: RankingQuestion = {
  type: "ranking",
  questionText: "Rank these languages based on your preference.",
  questionNumber: 1,
  answerOptions: [
    {
      optionId: "1",
      text: "JavaScript",
      weightings: { frontend: { 1: 10, 2: 5, 3: 2 } },
    },
    {
      optionId: "2",
      text: "Python",
      weightings: { dataScience: { 1: 10, 2: 7, 3: 3 } },
    },
    {
      optionId: "3",
      text: "Java",
      weightings: { backend: { 1: 10, 2: 8, 3: 4 } },
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("RankingQuizQuestion Component", () => {
  beforeEach(() => {
    useRankingStore.setState({ rankingsByQuestion: {} });
  });

  it("renders the question and options correctly", () => {
    render(<RankingQuizQuestion question={rankingQuestion} />);

    // Check if the question text is rendered
    expect(
      screen.getByText("Rank these languages based on your preference.")
    ).toBeInTheDocument();

    // Check if all options are rendered
    rankingQuestion.answerOptions.forEach((option) => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  it("updates the store when a ranking is selected", () => {
    render(<RankingQuizQuestion question={rankingQuestion} />);

    // Simulate clicking on the first rank circle for the first option
    const rank1ButtonForOption1 = screen.getAllByRole("button")[0];
    fireEvent.click(rank1ButtonForOption1);

    // Check if the store was updated correctly
    const state = useRankingStore.getState();
    expect(state.rankingsByQuestion[1]["1"]).toBe(1);
  });

  it("enforces unique rankings across options", () => {
    render(<RankingQuizQuestion question={rankingQuestion} />);

    // Click on the first ranking circle for the first option
    const rank1ButtonForOption1 = screen.getAllByRole("button")[0];
    fireEvent.click(rank1ButtonForOption1);

    // Click on the first ranking circle for the second option
    const rank1ButtonForOption2 = screen.getAllByRole("button")[3];
    fireEvent.click(rank1ButtonForOption2);

    // Check that the second option has the first rank, and the first option no longer has it
    const state = useRankingStore.getState();
    expect(state.rankingsByQuestion[1]["1"]).toBeUndefined();
    expect(state.rankingsByQuestion[1]["2"]).toBe(1);
  });
});
