import "@testing-library/jest-dom";
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";
import { IMCQQuestion } from "../../types/Question";

// Mock the API or external data imports if needed
jest.mock("../../util/common", () => ({
  API_BASE_URL: "mockApi.com",
}));

describe("MCQQuestionEditor", () => {
  const initialState: IMCQQuestion = {
    _id: "question-1",
    questionType: "MCQ",
    questionText: "Which specialization do you prefer?",
    answerOptions: [
      {
        _id: "option-1",
        text: "Option 1",
        weightings: {
          "Software Engineering": 5,
          "Civil Engineering": 7,
        },
      },
      {
        _id: "option-2",
        text: "Option 2",
        weightings: {
          "Electrical Engineering": 6,
        },
      },
    ],
    createdAt: new Date(), // Mock createdAt value
    updatedAt: new Date(), // Mock updatedAt value
  };

  beforeEach(() => {
    // Set initial Zustand state
    useMCQQuestionEditorStore.setState({
      selectedQuestion: initialState,
    });
  });

  afterEach(() => {
    // Reset Zustand state after each test
    useMCQQuestionEditorStore.setState({
      selectedQuestion: null,
    });
  });

  it("should update the question text", () => {
    const newText = "What is your preferred specialization?";

    useMCQQuestionEditorStore.getState().updateQuestionTitle(newText);

    const updatedState = useMCQQuestionEditorStore.getState().selectedQuestion;
    expect(updatedState?.questionText).toBe(newText);
  });

  it("should add a new spec to an option", () => {
    const optionId = "option-1";
    const prevSpecCount = Object.keys(
      useMCQQuestionEditorStore
        .getState()
        .selectedQuestion?.answerOptions.find(
          (option) => option._id === optionId
        )?.weightings || {}
    ).length;

    useMCQQuestionEditorStore.getState().addSpec(optionId);

    const updatedOption = useMCQQuestionEditorStore
      .getState()
      .selectedQuestion?.answerOptions.find(
        (option) => option._id === optionId
      );

    expect(Object.keys(updatedOption!.weightings).length).toBe(
      prevSpecCount + 1
    );
    expect(updatedOption!.weightings[`New Spec ${prevSpecCount + 1}`]).toBe(5); // Default value for new spec
  });

  it("should update spec name", () => {
    const optionId = "option-1";
    useMCQQuestionEditorStore
      .getState()
      .updateSpecName(optionId, "Software Engineering", "Software Eng");

    const updatedOption = useMCQQuestionEditorStore
      .getState()
      .selectedQuestion?.answerOptions.find(
        (option) => option._id === optionId
      );

    expect(updatedOption!.weightings["Software Eng"]).toBe(5); // Keeps original weighting
    expect(updatedOption!.weightings["Software Engineering"]).toBeUndefined(); // Old name should be removed
  });

  it("should update spec weighting", () => {
    const optionId = "option-1";
    useMCQQuestionEditorStore
      .getState()
      .updateSpecWeight(optionId, "Civil Engineering", 9);

    const updatedOption = useMCQQuestionEditorStore
      .getState()
      .selectedQuestion?.answerOptions.find(
        (option) => option._id === optionId
      );

    expect(updatedOption!.weightings["Civil Engineering"]).toBe(9);
  });

  it("should delete a spec from an option", () => {
    const optionId = "option-1";
    const prevSpecCount = Object.keys(
      useMCQQuestionEditorStore
        .getState()
        .selectedQuestion?.answerOptions.find(
          (option) => option._id === optionId
        )?.weightings || {}
    ).length;

    useMCQQuestionEditorStore
      .getState()
      .deleteSpec(optionId, "Civil Engineering");

    const updatedOption = useMCQQuestionEditorStore
      .getState()
      .selectedQuestion?.answerOptions.find(
        (option) => option._id === optionId
      );

    expect(Object.keys(updatedOption!.weightings).length).toBe(
      prevSpecCount - 1
    );
    expect(updatedOption!.weightings["Civil Engineering"]).toBeUndefined();
  });
});
