import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MCQQuizQuestion } from "../../components/quiz/MCQQuizQuestion";
import { useMCQQuestionStore } from "../../stores/MCQQuestionStore";
import { MCQQuestion } from "../../types/QuestionTypes";

const mockQuestion: MCQQuestion = {
  type: "mcq",
  questionText: "What is the best option",
  questionNumber: 1,
  answerOptions: [
    { optionId: "id1", text: "option 1", weightings: { spec1: 1 } },
    { optionId: "id2", text: "option 2", weightings: { spec2: 2 } },
    { optionId: "id3", text: "option 3", weightings: { spec3: 3 } },
  ],

  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("MCQQuestion Component", () => {
  beforeEach(() => {
    // Reset the store before each test
    useMCQQuestionStore.setState({ selectedOptionId: {} });
  });

  it("renders the question text", () => {
    render(<MCQQuizQuestion question={mockQuestion} />);

    // Check if the question text is rendered
    expect(screen.getByText("What is the best option")).toBeInTheDocument();
  });

  it("renders the mcq options", () => {
    render(<MCQQuizQuestion question={mockQuestion} />);

    // Check if all options are rendered
    mockQuestion.answerOptions.forEach((option) => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  it("renders the mcq with the correct default value", () => {
    render(<MCQQuizQuestion question={mockQuestion} />);

    // Check if the mcq is rendered with the default value (no value)
    const store = useMCQQuestionStore.getState();
    expect(store.selectedOptionId).toStrictEqual({});
  });

  it("updates the store when an option is selected", () => {
    render(<MCQQuizQuestion question={mockQuestion} />);

    // Simulate clicking on the first rank circle for the first option
    const mcqOption1 = screen.getAllByRole("option")[0];
    fireEvent.click(mcqOption1);

    // Check if the store was updated correctly
    const state = useMCQQuestionStore.getState();
    expect(state.selectedOptionId).toStrictEqual({ "1": "id1" });
  });
});
