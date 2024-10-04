import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddUpdateRoleModelModal from "../../components/rolemodel/AddUpdateRoleModelModal";
import { IRoleModel } from "../../types/RoleModel";

jest.mock("../../util/common", () => ({
  API_BASE_URL: "mockApi.com",
}));

jest.mock("../../hooks/useRoleModel");

const roleModelToEdit: IRoleModel = {
  _id: "123",
  name: "John Doe",
  title: "Software Engineer",
  specName: "Software Engineering",
  description: "A role model in the software field.",
  bio: "Bio for John Doe.",
  photoUrl: "test.jpg",
  socialMediaLinks: { linkedin: "https://linkedin.com/johndoe" },
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("AddUpdateRoleModelModal", () => {
  it("renders modal for adding a new role model", () => {
    render(<AddUpdateRoleModelModal open={true} onClose={jest.fn()} />);

    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Title" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Specialisation" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Bio" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Description" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "LinkedIn URL" })
    ).toBeInTheDocument();
  });

  it("renders modal for editing an existing role model", () => {
    render(
      <AddUpdateRoleModelModal
        open={true}
        onClose={jest.fn()}
        roleModelToEdit={roleModelToEdit}
      />
    );

    expect(screen.getByText("Edit Role Model")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Software Engineer")).toBeInTheDocument();
  });

  it("updates state when form fields are changed", () => {
    render(<AddUpdateRoleModelModal open={true} onClose={jest.fn()} />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const titleInput = screen.getByRole("textbox", { name: "Title" });

    fireEvent.change(nameInput, { target: { value: "Jane Smith" } });
    fireEvent.change(titleInput, { target: { value: "Civil Engineer" } });

    expect(nameInput).toHaveValue("Jane Smith");
    expect(titleInput).toHaveValue("Civil Engineer");
  });

  it("updates form fields correctly when adding a new role model", async () => {
    render(<AddUpdateRoleModelModal open={true} onClose={jest.fn()} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Name" }), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "CEO" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Specialisation" }), {
      target: { value: "Leadership" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Bio" }), {
      target: { value: "Bio for Jane Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Description" }), {
      target: { value: "CEO Bio" },
    });

    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue(
      "Jane Doe"
    );
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue("CEO");
    expect(screen.getByRole("textbox", { name: "Specialisation" })).toHaveValue(
      "Leadership"
    );
    expect(screen.getByRole("textbox", { name: "Bio" })).toHaveValue(
      "Bio for Jane Doe"
    );
    expect(screen.getByRole("textbox", { name: "Description" })).toHaveValue(
      "CEO Bio"
    );
  });
});
