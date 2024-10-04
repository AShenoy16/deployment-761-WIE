import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePageCard from "../../components/homepage/HomePageCard";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Mock the `useNavigate` hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("HomePageCard", () => {
  const mockNavigate = jest.fn();
  const mockProps = {
    title: "Card Title",
    description: "Card description goes here.",
    image: "https://via.placeholder.com/150",
    link: "/internal-link",
  };

  beforeEach(() => {
    // Ensure the navigate function is reset between tests
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the HomePageCard with the correct title, description, and image", () => {
    render(
      <MemoryRouter>
        <HomePageCard {...mockProps} />
      </MemoryRouter>
    );

    // Check if the title is rendered correctly
    expect(screen.getByText("Card Title")).toBeInTheDocument();

    // Check if the description is rendered correctly
    expect(screen.getByText("Card description goes here.")).toBeInTheDocument();

    // Check if the image is rendered with the correct src
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockProps.image);
    expect(imgElement).toHaveAttribute("alt", mockProps.title);
  });

  it("navigates to an internal link when 'Learn More' button is clicked", () => {
    render(
      <MemoryRouter>
        <HomePageCard {...mockProps} />
      </MemoryRouter>
    );

    // Simulate the button click
    const learnMoreButton = screen.getByText("Learn More");
    fireEvent.click(learnMoreButton);

    // Ensure that the navigate function is called with the internal link
    expect(mockNavigate).toHaveBeenCalledWith(mockProps.link);
  });

  it("opens an external link in a new tab when 'Learn More' button is clicked", () => {
    // Modify the props to use an external link
    const externalLinkProps = {
      ...mockProps,
      link: "https://external-link.com",
    };

    // Spy on window.open
    const windowOpenSpy = jest
      .spyOn(window, "open")
      .mockImplementation(() => null);

    render(
      <MemoryRouter>
        <HomePageCard {...externalLinkProps} />
      </MemoryRouter>
    );

    // Simulate the button click
    const learnMoreButton = screen.getByText("Learn More");
    fireEvent.click(learnMoreButton);

    // Ensure that window.open is called with the external link
    expect(windowOpenSpy).toHaveBeenCalledWith(
      externalLinkProps.link,
      "_blank",
      "noopener noreferrer"
    );

    // Cleanup the spy after test
    windowOpenSpy.mockRestore();
  });
});
