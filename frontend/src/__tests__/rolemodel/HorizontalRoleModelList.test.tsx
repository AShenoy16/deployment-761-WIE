import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HorizontalRoleModelList from "../../components/rolemodel/HorizontalRoleModelList";
import { IRoleModel } from "../../types/RoleModel";

// Mock data
const mockRoleModels: IRoleModel[] = [
  {
    _id: "1",
    name: "Jane Doe",
    title: "Software Engineer",
    specName: "Software Engineering",
    description: "An experienced software engineer.",
    bio: "Bio for Jane Doe.",
    photoUrl: "test.jpg",
    socialMediaLinks: { linkedin: "https://linkedin.com/janedoe" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "John Smith",
    title: "Civil Engineer",
    specName: "Civil Engineering",
    description: "A leading civil engineer.",
    bio: "Bio for John Smith.",
    photoUrl: "test2.jpg",
    socialMediaLinks: { linkedin: "https://linkedin.com/johnsmith" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("HorizontalRoleModelList", () => {
  const handleRoleModelCardClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders role model cards", () => {
    render(
      <HorizontalRoleModelList
        specRoleModels={mockRoleModels}
        handleRoleModelCardClick={handleRoleModelCardClick}
      />
    );

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("calls handleRoleModelCardClick when a card is clicked", () => {
    render(
      <HorizontalRoleModelList
        specRoleModels={mockRoleModels}
        handleRoleModelCardClick={handleRoleModelCardClick}
      />
    );

    const janeDoeCard = screen.getByText("Jane Doe");
    fireEvent.click(janeDoeCard);

    expect(handleRoleModelCardClick).toHaveBeenCalledTimes(1);
    expect(handleRoleModelCardClick).toHaveBeenCalledWith(mockRoleModels[0]);
  });

  it("displays role models horizontally and allows scrolling", () => {
    render(
      <HorizontalRoleModelList
        specRoleModels={mockRoleModels}
        handleRoleModelCardClick={handleRoleModelCardClick}
      />
    );

    const stackElement = screen.getByRole("list");
    expect(stackElement).toHaveStyle("overflow: auto");
    expect(stackElement).toHaveStyle("flex-direction: row");
  });

  it("sets 'justifyContent' to center when content does not overflow", () => {
    render(
      <HorizontalRoleModelList
        specRoleModels={mockRoleModels}
        handleRoleModelCardClick={handleRoleModelCardClick}
      />
    );

    const stackElement = screen.getByRole("list");
    expect(stackElement).toHaveStyle("justify-content: center");
  });

  it("sets 'justifyContent' to flex-start when content overflows", () => {
    // Simulate a scenario where the content is overflowing
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 500,
    });

    render(
      <HorizontalRoleModelList
        specRoleModels={mockRoleModels}
        handleRoleModelCardClick={handleRoleModelCardClick}
      />
    );

    const stackElement = screen.getByRole("list");
    expect(stackElement).toHaveStyle("justify-content: flex-start");
  });
});
