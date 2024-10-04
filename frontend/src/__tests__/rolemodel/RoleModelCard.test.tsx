import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleModelCard from "../../components/rolemodel/RoleModelCard";
import { IRoleModel } from "../../types/RoleModel";

// Mock data for the role model
const mockRoleModel: IRoleModel = {
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
};

describe("RoleModelCard", () => {
  it("renders role model details correctly", () => {
    render(<RoleModelCard model={mockRoleModel} onClick={jest.fn()} />);

    // Check if the role model's image, name, description, and title are rendered
    const name = screen.getByText("Jane Doe");
    const description = screen.getByText("An experienced software engineer.");
    const title = screen.getByText("Software Engineer");
    const image = screen.getByAltText("Jane Doe");

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("triggers the onClick callback when card is clicked", () => {
    const handleClick = jest.fn();
    render(<RoleModelCard model={mockRoleModel} onClick={handleClick} />);

    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockRoleModel); // Ensures correct model is passed to onClick
  });
});
