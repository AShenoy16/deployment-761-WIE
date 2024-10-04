import "@testing-library/jest-dom";
import { useSliderQuestionEditorStore } from "../../stores/SliderQuestionEditorStore";
import { ISliderQuestion } from "../../types/Question";

jest.mock("../../util/common", () => ({
  API_BASE_URL: "mockApi.com",
}));

describe("SliderQuestionEditor", () => {
  const initialState: ISliderQuestion = {
    _id: "12345", // Add a mock ID
    questionType: "Slider", // Ensure the type matches the ISliderQuestion interface
    questionText: "Which specialization do you prefer?",
    sliderWeights: {
      _id: "sliderWeights123", // Add a mock ID for sliderWeights
      weightings: {
        "Software Engineering": 5,
        "Civil Engineering": 7,
      },
    },
    createdAt: new Date(), // Add mock date
    updatedAt: new Date(), // Add mock date
  };

  beforeEach(() => {
    // Set initial Zustand state
    useSliderQuestionEditorStore.setState({
      selectedQuestion: initialState,
    });
  });

  afterEach(() => {
    // Reset Zustand state after each test
    useSliderQuestionEditorStore.setState({
      selectedQuestion: null,
    });
  });

  it("should update the question text", () => {
    const newText = "What specialization do you prefer?";

    useSliderQuestionEditorStore.getState().updateQuestionTitle(newText);

    const updatedState =
      useSliderQuestionEditorStore.getState().selectedQuestion;
    expect(updatedState?.questionText).toBe(newText);
  });

  it("should add a new specialization", () => {
    useSliderQuestionEditorStore
      .getState()
      .addNewSpec("Electrical Engineering", 6);

    const updatedState =
      useSliderQuestionEditorStore.getState().selectedQuestion;
    expect(
      updatedState?.sliderWeights.weightings["Electrical Engineering"]
    ).toBe(6);
  });

  it("should delete a specialization", () => {
    useSliderQuestionEditorStore.getState().deleteSpec("Software Engineering");

    const updatedState =
      useSliderQuestionEditorStore.getState().selectedQuestion;
    expect(
      updatedState?.sliderWeights.weightings["Software Engineering"]
    ).toBeUndefined();
  });

  it("should update spec weighting", () => {
    useSliderQuestionEditorStore
      .getState()
      .updateSpecWeighting("Civil Engineering", 9);

    const updatedState =
      useSliderQuestionEditorStore.getState().selectedQuestion;
    expect(updatedState?.sliderWeights.weightings["Civil Engineering"]).toBe(9);
  });

  it("should update spec name", () => {
    useSliderQuestionEditorStore
      .getState()
      .updateSpecName("Civil Engineering", "Civil Eng");

    const updatedState =
      useSliderQuestionEditorStore.getState().selectedQuestion;
    expect(updatedState?.sliderWeights.weightings["Civil Eng"]).toBe(7); // Keeps the original weighting
    expect(
      updatedState?.sliderWeights.weightings["Civil Engineering"]
    ).toBeUndefined(); // Old name is removed
  });
});
