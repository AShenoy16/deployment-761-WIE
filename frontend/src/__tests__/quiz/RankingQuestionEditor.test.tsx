import "@testing-library/jest-dom";
import { useRankingQuestionEditorStore } from "../../stores/RankingQuestionEditorStore";
import { IRankingQuestion } from "../../types/Question";

describe("RankingQuestionEditorStore", () => {
  const initialRankingQuestion: IRankingQuestion = {
    _id: "ranking-question-123",
    questionType: "Ranking",
    questionText: "Rank the following specializations:",
    answerOptions: [
      {
        _id: "option-1",
        text: "First Option",
        weightings: {
          "Software Engineering": 5,
          "Civil Engineering": 7,
        },
      },
      {
        _id: "option-2",
        text: "Second Option",
        weightings: {
          "Electrical Engineering": 4,
        },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    // Set the initial Zustand state
    useRankingQuestionEditorStore.setState({
      selectedQuestion: initialRankingQuestion,
    });
  });

  afterEach(() => {
    // Reset Zustand state after each test
    useRankingQuestionEditorStore.setState({
      selectedQuestion: null,
    });
  });

  it("should update the question title", () => {
    const newTitle = "Please rank the specializations.";

    useRankingQuestionEditorStore.getState().updateQuestionTitle(newTitle);

    const updatedState =
      useRankingQuestionEditorStore.getState().selectedQuestion;
    expect(updatedState?.questionText).toBe(newTitle);
  });

  it("should update the option title", () => {
    const newOptionTitle = "Updated First Option";

    useRankingQuestionEditorStore
      .getState()
      .updateOptionTitle("option-1", newOptionTitle);

    const updatedState =
      useRankingQuestionEditorStore.getState().selectedQuestion;
    const updatedOption = updatedState?.answerOptions.find(
      (option) => option._id === "option-1"
    );

    expect(updatedOption?.text).toBe(newOptionTitle);
  });

  it("should add a new spec weighting", () => {
    const question = useRankingQuestionEditorStore.getState().selectedQuestion;
    const option = question?.answerOptions.find(
      (option) => option._id === "option-1"
    );
    const prevWeightingCount = Object.keys(option!.weightings).length;

    useRankingQuestionEditorStore.getState().addSpecWeighting(option!._id);

    const updatedOption = useRankingQuestionEditorStore
      .getState()
      .selectedQuestion?.answerOptions.find(
        (updatedOption) => updatedOption._id === "option-1"
      );
    // New weighting should've been added
    expect(Object.keys(updatedOption!.weightings).length).toBe(
      prevWeightingCount + 1
    );
    // Assert that the new spec exists and has the correct weight
    const newSpecName = `New Spec ${prevWeightingCount + 1}`;
    expect(updatedOption!.weightings[newSpecName]).toBe(5);
  });

  it("should update the spec weighting value", () => {
    useRankingQuestionEditorStore
      .getState()
      .updateSpecWeightingValue("option-1", "Software Engineering", 9);

    const updatedState =
      useRankingQuestionEditorStore.getState().selectedQuestion;
    const updatedOption = updatedState?.answerOptions.find(
      (option) => option._id === "option-1"
    );

    expect(updatedOption?.weightings["Software Engineering"]).toBe(9);
  });

  it("should update the spec weighting name", () => {
    useRankingQuestionEditorStore
      .getState()
      .updateSpecWeightingName("option-1", "Software Engineering", "SE");

    const updatedState =
      useRankingQuestionEditorStore.getState().selectedQuestion;
    const updatedOption = updatedState?.answerOptions.find(
      (option) => option._id === "option-1"
    );

    expect(updatedOption?.weightings["SE"]).toBe(5);
    expect(updatedOption?.weightings["Software Engineering"]).toBeUndefined();
  });

  it("should delete a spec weighting", () => {
    useRankingQuestionEditorStore
      .getState()
      .deleteSpecWeighting("option-1", "Civil Engineering");

    const updatedState =
      useRankingQuestionEditorStore.getState().selectedQuestion;
    const updatedOption = updatedState?.answerOptions.find(
      (option) => option._id === "option-1"
    );

    expect(updatedOption?.weightings["Civil Engineering"]).toBeUndefined();
  });
});
