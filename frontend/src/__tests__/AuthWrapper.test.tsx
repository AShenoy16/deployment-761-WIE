import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthWrapper from "../components/AuthWrapper";
import { useAuthStore } from "../stores/AuthenticationStore";

describe("AuthWrapper", () => {
  beforeEach(() => {
    const { setIsLoggedIn } = useAuthStore.getState();
    setIsLoggedIn(false);
  });

  it("redirects to login when admin is not logged in", () => {
    render(
      <MemoryRouter>
        <AuthWrapper>
          <div>Protected Content</div>
        </AuthWrapper>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children when admin is logged in", () => {
    // Log in the admin by updating the Zustand store state
    const { setIsLoggedIn } = useAuthStore.getState();
    setIsLoggedIn(true);

    render(
      <MemoryRouter>
        <AuthWrapper>
          <div>Protected Content</div>
        </AuthWrapper>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
