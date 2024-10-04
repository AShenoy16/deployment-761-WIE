import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroSection from "../../components/homepage/HeroSection";

describe("HeroSection", () => {
  const mockProps = {
    title: "Welcome to the Future of Engineering",
    subtitle: "Empowering the next generation of engineers",
    image:
      "https://www.auckland.ac.nz/content/auckland/en/engineering/study-with-us/women-in-engineering/_jcr_content/par/linkspagetemplategri_559213939/par2/subflexicomponentlin/image.img.480.low.jpg/1551045302558.jpg",
  };

  it("renders the HeroSection with the correct title and subtitle", () => {
    render(<HeroSection {...mockProps} />);

    // Check if the title is rendered correctly
    expect(
      screen.getByText("Welcome to the Future of Engineering")
    ).toBeInTheDocument();

    // Check if the subtitle is rendered correctly
    expect(
      screen.getByText("Empowering the next generation of engineers")
    ).toBeInTheDocument();
  });

  it("renders the hero image correctly", () => {
    render(<HeroSection {...mockProps} />);

    // Check if the image is rendered and has the correct src attribute
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockProps.image);
  });

  it("applies the correct background image style", () => {
    render(<HeroSection {...mockProps} />);

    // Check if the component has the correct background image style
    const backgroundElement = screen.getByRole("banner"); // You can add a role="banner" to the Box for testing
    expect(backgroundElement).toHaveStyle(
      `background-image: url(/engineering-building.jpg)`
    );
  });
});
