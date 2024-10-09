import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardSection from "../../components/homepage/CardSection";
import { MemoryRouter } from "react-router-dom";
import { mockIntersectionObserver } from "../../util/mockIntersectionObserver";

const mockResources = [
  {
    title: "Resource 1",
    description: "Description 1",
    image: "image1.jpg",
    link: "https://example.com/resource1",
  },
  {
    title: "Resource 2",
    description: "Description 2",
    image: "image2.jpg",
    link: "https://example.com/resource2",
  },
];

// Mock IntersectionObserver before all tests
beforeAll(() => {
  mockIntersectionObserver();
});

describe("CardSection", () => {
  it("renders the section title", () => {
    render(
      <MemoryRouter>
        <CardSection resources={mockResources} />
      </MemoryRouter>
    );

    // Check if the section title is rendered correctly
    expect(screen.getByText("Additional Resources")).toBeInTheDocument();
  });

  it("renders the correct number of cards", () => {
    render(
      <MemoryRouter>
        <CardSection resources={mockResources} />
      </MemoryRouter>
    );

    // Check if the correct number of cards is rendered
    expect(screen.getByRole("list").children).toHaveLength(
      mockResources.length
    );
  });

  it("displays the correct card titles and descriptions", () => {
    render(
      <MemoryRouter>
        <CardSection resources={mockResources} />
      </MemoryRouter>
    );

    // Check if each card's title and description are displayed
    mockResources.forEach((resource) => {
      expect(screen.getByText(resource.title)).toBeInTheDocument();
      expect(screen.getByText(resource.description)).toBeInTheDocument();
    });
  });

  it("renders card images", () => {
    render(
      <MemoryRouter>
        <CardSection resources={mockResources} />
      </MemoryRouter>
    );

    // Check if each card's image is rendered (based on alt text or image source)
    mockResources.forEach((resource) => {
      const image = screen.getByAltText(resource.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", resource.image);
    });
  });
});
