import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RequirementsCard from "../../components/highschool_requirements/RequirementsCard";

const mockRequirements = {
  title: "NCEA",
  requiredScore: 80,
  requirements: ["Algebra", "Geometry", "Physics"],
};

describe("RequirementsCard", () => {
  it("renders the card with the correct title", () => {
    render(<RequirementsCard {...mockRequirements} />);

    // Check if the title is rendered correctly
    expect(screen.getByText(mockRequirements.title)).toBeInTheDocument();
  });

  it("displays the required score", () => {
    render(<RequirementsCard {...mockRequirements} />);

    // Check if the required score is displayed
    expect(
      screen.getByText(mockRequirements.requiredScore.toString())
    ).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
  });

  it("displays the list of requirements", () => {
    render(<RequirementsCard {...mockRequirements} />);

    // Check if each requirement is displayed
    mockRequirements.requirements.forEach((requirement) => {
      expect(screen.getByText(requirement)).toBeInTheDocument();
    });
  });

  it("displays the correct number of requirements", () => {
    render(<RequirementsCard {...mockRequirements} />);

    // Check if the correct number of requirement items are rendered
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockRequirements.requirements.length);
  });
});
