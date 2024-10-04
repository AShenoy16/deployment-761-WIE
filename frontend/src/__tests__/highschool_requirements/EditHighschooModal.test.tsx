import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import EditHighschoolModal from "../../components/highschool_requirements/EditHighschoolModal";
import { useHighschoolRequirements } from "../../hooks/useHighschoolRequirements";
import { IHighschoolRequirement } from "../../types/HighschoolRequirements";

jest.mock("../../util/common", () => ({
  API_BASE_URL: "mockApi.com",
}));

jest.mock("../../hooks/useHighschoolRequirements");

const highschoolRequirementsDataMock: IHighschoolRequirement[] = [
  {
    _id: "1",
    title: "NCEA",
    requiredScore: 80,
    requirements: ["Algebra", "Geometry"],
  },
  {
    _id: "2",
    title: "CIE",
    requiredScore: 75,
    requirements: ["Physics", "Chemistry"],
  },
];

describe("EditHighschoolModal", () => {
  let onCloseMock: any;
  let updateMutationMock: any;

  beforeEach(() => {
    // Mocking the mutation function inside the hook
    onCloseMock = jest.fn();
    updateMutationMock = {
      mutate: jest.fn(),
    };

    (useHighschoolRequirements as jest.Mock).mockReturnValue({
      highschoolRequirements: highschoolRequirementsDataMock,
      isLoading: false,
      isError: false,
      updateMutation: updateMutationMock,
    });
  });

  it("renders the modal with the correct data", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={jest.fn()}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    expect(
      screen.getByText("Edit Highschool Requirements")
    ).toBeInTheDocument();
    expect(
      screen.getByText(highschoolRequirementsDataMock[0].title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(highschoolRequirementsDataMock[1].title)
    ).toBeInTheDocument();
    expect(screen.getAllByLabelText("Required Score")[0]).toHaveValue(
      highschoolRequirementsDataMock[0].requiredScore.toString()
    );
    expect(screen.getAllByLabelText("Required Score")[1]).toHaveValue(
      highschoolRequirementsDataMock[1].requiredScore.toString()
    );
  });

  it("updates the required score when user inputs a valid number", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={jest.fn()}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    const scoreInput = screen.getAllByLabelText("Required Score")[0];
    fireEvent.change(scoreInput, { target: { value: "90" } });

    expect(scoreInput).toHaveValue(Number(90).toString());
  });

  it("displays an error message when the required score is invalid", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={jest.fn()}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    const scoreInput = screen.getAllByLabelText("Required Score")[0];
    fireEvent.change(scoreInput, { target: { value: "-10" } });

    expect(
      screen.getByText("Invalid score. Must be a positive number.")
    ).toBeInTheDocument();
  });

  it("adds a new requirement when the add button is clicked", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={jest.fn()}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    const addButton = screen.getAllByText("Add Requirement")[0];
    fireEvent.click(addButton);

    expect(screen.getByLabelText("Requirement 3")).toBeInTheDocument();
  });

  it("deletes a requirement when the delete button is clicked", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={jest.fn()}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    const deleteButton = screen.getAllByRole("delete-btn")[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Algebra")).not.toBeInTheDocument();
  });

  it("calls the updateMutation when the save button is clicked", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={onCloseMock}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(updateMutationMock.mutate).toHaveBeenCalled();
  });

  it("resets the form when the cancel button is clicked", () => {
    render(
      <EditHighschoolModal
        open={true}
        onClose={onCloseMock}
        highschoolRequirementsData={highschoolRequirementsDataMock}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
