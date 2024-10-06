import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ImpactSection from "../../components/homepage/ImpactSection";
import { mockIntersectionObserver } from "../../util/mockIntersectionObserver";

// Mock IntersectionObserver before all tests
beforeAll(() => {
  mockIntersectionObserver();
});

describe("ImpactSection", () => {
  const mockProps = {
    header: "Our Impact",
    text: (
      <p>
        We are committed to making a difference. Our goal is to inspire the next
        generation of engineers and contribute to a sustainable future.
      </p>
    ),
  };

  it("renders the header correctly", () => {
    render(<ImpactSection {...mockProps} />);

    // Check if the header is rendered correctly
    expect(screen.getByText("Our Impact")).toBeInTheDocument();
  });

  it("renders the text content correctly", () => {
    render(<ImpactSection {...mockProps} />);

    // Check if the provided text content is rendered
    expect(
      screen.getByText(
        "We are committed to making a difference. Our goal is to inspire the next generation of engineers and contribute to a sustainable future."
      )
    ).toBeInTheDocument();
  });

  it("renders the embedded YouTube video", () => {
    render(<ImpactSection {...mockProps} />);

    // Check if the iframe (YouTube embed) is rendered
    const iframeElement = screen.getByTitle("test");
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/_55adK4RXF8?si=ekGykN8KPyNF9v4z"
    );
  });

  it("renders the horizontal quote card correctly", () => {
    render(<ImpactSection {...mockProps} />);

    // Check if the quote is rendered correctly
    expect(
      screen.getByText(
        /"New Zealand needs 2,500 more engineers every year to keep up with demand."/
      )
    ).toBeInTheDocument();

    // Check if the attribution is rendered correctly
    expect(screen.getByText("- Engineering New Zealand")).toBeInTheDocument();
  });
});
