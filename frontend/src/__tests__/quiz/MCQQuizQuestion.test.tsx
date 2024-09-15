import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MCQQuizQuestion } from "../../components/quiz/MCQQuizQuestion";
import { useMCQQuestionStore } from "../../stores/MCQQuestionStore";
import { IMCQQuestion } from "../../types/Question";
import { mockQuestions } from "../../util/mockQuizData";

const mockMCQ: IMCQQuestion = mockQuestions[0] as IMCQQuestion;
const questionId = mockMCQ._id;
const firstOptId = mockMCQ.answerOptions[0]._id;

describe("MCQQuestion Component", () => {
  beforeEach(() => {
    // Reset the store before each test
    useMCQQuestionStore.setState({ selectedOptionId: {} });
  });

  it("renders the question text", () => {
    render(<MCQQuizQuestion question={mockMCQ} />);

    // Check if the question text is rendered
    expect(screen.getByText(mockMCQ.questionText)).toBeInTheDocument();
  });

  it("renders the mcq options", () => {
    render(<MCQQuizQuestion question={mockMCQ} />);

    // Check if all options are rendered
    mockMCQ.answerOptions.forEach((option) => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  it("renders the mcq with the correct default value", () => {
    render(<MCQQuizQuestion question={mockMCQ} />);

    // Check if the mcq is rendered with the default value (no value)
    const store = useMCQQuestionStore.getState();
    expect(store.selectedOptionId).toStrictEqual({});
  });

  it("updates the store when an option is selected", () => {
    render(<MCQQuizQuestion question={mockMCQ} />);

    // Simulate clicking on the first rank circle for the first option
    const mcqOption1 = screen.getAllByRole("option")[0];
    fireEvent.click(mcqOption1);

    // Check if the store was updated correctly
    const state = useMCQQuestionStore.getState();
    expect(state.selectedOptionId).toStrictEqual({ [questionId]: firstOptId });
  });
});
