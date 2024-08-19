// src/__ tests __/App.test.tsx

// Test file to check if installed dependencies work

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
import MockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let mock: MockAdapter;
let queryClient: QueryClient;

beforeEach(() => {
  mock = new MockAdapter(axios);
  mock.onGet("https://jsonplaceholder.typicode.com/posts/1").reply(200, {
    title: "mocked title",
  });
  queryClient = new QueryClient();
});

afterEach(() => {
  mock.restore();
});

describe("App Component", () => {
  it("fetches and displays data using TanStack Query", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    // Assert initial loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the data to be displayed after fetching
    await waitFor(() =>
      expect(screen.getByText("mocked title")).toBeInTheDocument()
    );
  });
});
