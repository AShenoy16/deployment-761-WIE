import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SliderQuizQuestion } from "../../components/quiz/SliderQuizQuestion";
import { ISliderQuestion } from "../../types/QuestionTypes";
import { useSliderQuestionStore } from "../../stores/SliderQuizQuestionStore";
import { mockQuestions } from "../../util/mockQuizData";

const mockSliderQuestion: ISliderQuestion = mockQuestions[4] as ISliderQuestion;

describe("SliderQuizQuestion Component", () => {
  beforeEach(() => {
    // Reset the store before each test
    const store = useSliderQuestionStore.getState();
    store.setSelectedValue(mockSliderQuestion._id, 3); // set default value to 3 (Neutral)
  });

  it("renders the question text", () => {
    render(<SliderQuizQuestion question={mockSliderQuestion} />);

    // Check if the question text is rendered
    expect(
      screen.getByText(mockSliderQuestion.questionText)
    ).toBeInTheDocument();
  });

  it("renders the slider with the correct initial value", () => {
    render(<SliderQuizQuestion question={mockSliderQuestion} />);

    // Check if the slider is rendered with the default value (3)
    const store = useSliderQuestionStore.getState();
    expect(store.selectedValue[mockSliderQuestion._id]).toBe(3);
  });

  it("updates the store when the slider value changes", () => {
    render(<SliderQuizQuestion question={mockSliderQuestion} />);

    const slider = screen.getByRole("slider");

    // Simulate changing the slider value to 4 (Agree)
    fireEvent.change(slider, { target: { value: "4" } });

    // Check if the store was updated
    const store = useSliderQuestionStore.getState();
    expect(store.selectedValue[mockSliderQuestion._id]).toBe(4);
  });
});
