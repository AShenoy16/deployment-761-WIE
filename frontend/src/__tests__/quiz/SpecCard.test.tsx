import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SpecSummary } from "../../util/mockResultsData";
import SpecCard from "../../components/quiz/SpecCard";

// Mock data for the test
const mockSpec: SpecSummary = {
  name: "Software Engineering",
  description: "Software Engineers are problem solvers.",
  careerPathways: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Software Architect",
  ],
};

describe("SpecCard Component", () => {
  it("renders the specialization name", () => {
    render(<SpecCard {...mockSpec} />);

    // Verify the name is rendered
    expect(screen.getByText(mockSpec.name)).toBeInTheDocument();
  });

  it("renders the career pathways as a list", () => {
    render(<SpecCard {...mockSpec} />);

    // Verify all career pathways are rendered
    mockSpec.careerPathways.forEach((pathway) => {
      expect(screen.getByText(pathway)).toBeInTheDocument();
    });
  });

  it("shows overlay with description on hover", () => {
    render(<SpecCard {...mockSpec} />);

    // Hover over the card
    const card = screen.getByRole("button");
    fireEvent.mouseEnter(card);

    // Verify the description is displayed on hover
    expect(screen.getByText(mockSpec.description)).toBeInTheDocument();
    expect(screen.getByText("Click to find out more")).toBeInTheDocument();

    // Test if the overlay disappears when mouse leaves
    fireEvent.mouseLeave(card);
    expect(screen.queryByText(mockSpec.description)).not.toBeInTheDocument();
  });
});
