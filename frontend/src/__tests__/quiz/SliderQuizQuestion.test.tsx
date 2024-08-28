import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SliderQuizQuestion } from "../../components/quiz/SliderQuizQuestion";
import { SliderQuestion } from "../../types/QuestionTypes";
import { useSliderQuestionStore } from "../../stores/SliderQuizQuestionStore";

const mockQuestion: SliderQuestion = {
  type: "slider",
  questionText: "Rate your proficiency in JavaScript.",
  questionNumber: 1,
  sliderRange: {
    sliderId: "1",
    min: 1,
    max: 5,
    weightings: { frontend: [1, 5], backend: [1, 5] },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("SliderQuizQuestion Component", () => {
  beforeEach(() => {
    // Reset the store before each test
    const store = useSliderQuestionStore.getState();
    store.setSelectedValue(mockQuestion.questionNumber, 3); // set default value to 3 (Neutral)
  });

  it("renders the question text", () => {
    render(<SliderQuizQuestion question={mockQuestion} />);

    // Check if the question text is rendered
    expect(
      screen.getByText(/Rate your proficiency in JavaScript./i)
    ).toBeInTheDocument();
  });

  it("renders the slider with the correct initial value", () => {
    render(<SliderQuizQuestion question={mockQuestion} />);

    // Check if the slider is rendered with the default value (3)
    const store = useSliderQuestionStore.getState();
    expect(store.selectedValue[mockQuestion.questionNumber]).toBe(3);
  });

  it("updates the store when the slider value changes", () => {
    render(<SliderQuizQuestion question={mockQuestion} />);

    const slider = screen.getByRole("slider");

    // Simulate changing the slider value to 4 (Agree)
    fireEvent.change(slider, { target: { value: "4" } });

    // Check if the store was updated
    const store = useSliderQuestionStore.getState();
    expect(store.selectedValue[mockQuestion.questionNumber]).toBe(4);
  });
});
