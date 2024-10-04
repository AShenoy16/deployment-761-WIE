import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleModelModal from "../../components/rolemodel/RoleModelModal";
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

describe("RoleModelModal", () => {
  it("renders the modal with role model details when open", () => {
    render(
      <RoleModelModal
        open={true}
        onClose={jest.fn()}
        roleModel={mockRoleModel}
      />
    );

    // Check if role model details are displayed
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText(mockRoleModel.bio)).toBeInTheDocument();

    // Check if the image is displayed
    const image = screen.getByAltText("Jane Doe");
    expect(image).toHaveAttribute("src", "test.jpg");
  });

  it("does not render any role model information if no roleModel is passed", () => {
    render(<RoleModelModal open={true} onClose={jest.fn()} roleModel={null} />);

    // Ensure the role model data is not displayed when roleModel is null
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Jane Doe")).not.toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <RoleModelModal
        open={true}
        onClose={handleClose}
        roleModel={mockRoleModel}
      />
    );

    // Click the close button
    fireEvent.click(screen.getByLabelText("close"));

    // Ensure the onClose callback is triggered
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("opens the LinkedIn profile when the LinkedIn icon is clicked", () => {
    render(
      <RoleModelModal
        open={true}
        onClose={jest.fn()}
        roleModel={mockRoleModel}
      />
    );

    const linkedInButton = screen.getByRole("link");
    expect(linkedInButton).toHaveAttribute(
      "href",
      "https://linkedin.com/janedoe"
    );
  });
});
