import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditModalSpecInfo from "../../components/specinfo/EditModalSpecInfo";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.mock("../../util/common", () => ({
  API_BASE_URL: "mockApi.com",
}));

// Mock data for the specialization
const mockSpecInfoResult = {
  name: "Software Engineering",
  careerPathways: ["Developer", "Architect"],
  header: "Building robust systems",
  leftDetail: "This is left detail.",
  rightDetail: "This is right detail.",
  leftImage: "leftImage.jpg",
  rightImage: "rightImage.jpg",
  testimonials: [
    { name: "John", description: "Great course!" },
    { name: "Jane", description: "Very informative!" },
  ],
  jobAvailability: "High",
  medianSalary: 80000,
  experiencedSalary: 120000,
};

// Mock API request
const mock = new MockAdapter(axios);

describe("EditModalSpecInfo", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("renders modal with specialization details", () => {
    render(
      <MemoryRouter>
        <EditModalSpecInfo
          open={true}
          onClose={jest.fn()}
          specInfoResult={mockSpecInfoResult}
          name={mockSpecInfoResult.name}
          onSave={jest.fn()}
        />
      </MemoryRouter>
    );

    // Check for modal title and inputs
    expect(screen.getByText("Edit Spec Info")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Software Engineering")
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Building robust systems")
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("This is left detail.")
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("This is right detail.")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Jane")).toBeInTheDocument();
    expect(screen.getByDisplayValue("80000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("120000")).toBeInTheDocument();
  });

  it("updates input fields correctly when changed", () => {
    render(
      <MemoryRouter>
        <EditModalSpecInfo
          open={true}
          onClose={jest.fn()}
          specInfoResult={mockSpecInfoResult}
          name={mockSpecInfoResult.name}
          onSave={jest.fn()}
        />
      </MemoryRouter>
    );

    // Change title
    const titleInput = screen.getByDisplayValue("Software Engineering");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    expect(titleInput).toHaveValue("Updated Title");

    // Change header
    const headerInput = screen.getByDisplayValue("Building robust systems");
    fireEvent.change(headerInput, { target: { value: "New Header" } });
    expect(headerInput).toHaveValue("New Header");

    // Change salary
    const salaryInput = screen.getByDisplayValue("80000");
    fireEvent.change(salaryInput, { target: { value: "90000" } });
    expect(salaryInput).toHaveValue("90000");
  });

  it("closes the modal when the back button is clicked", () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter>
        <EditModalSpecInfo
          open={true}
          onClose={onClose}
          specInfoResult={mockSpecInfoResult}
          name={mockSpecInfoResult.name}
          onSave={jest.fn()}
        />
      </MemoryRouter>
    );

    // Click the back button
    fireEvent.click(screen.getByRole("back-btn"));

    // Ensure the onClose callback is triggered
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("sends correct data when saving changes", async () => {
    const onSave = jest.fn();
    mock
      .onPatch(`mockApi.com/specializations/Software%20Engineering`)
      .reply(200, { name: "Updated Software Engineering" });

    render(
      <MemoryRouter>
        <EditModalSpecInfo
          open={true}
          onClose={jest.fn()}
          specInfoResult={mockSpecInfoResult}
          name={mockSpecInfoResult.name}
          onSave={onSave}
        />
      </MemoryRouter>
    );

    // Change title and save
    const titleInput = screen.getByDisplayValue("Software Engineering");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith({
        name: "Updated Software Engineering",
      })
    );
  });
});
