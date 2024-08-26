import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { usePlaceholderStore } from "../stores/placeholderStore";

let mock: MockAdapter;
let queryClient: QueryClient;

beforeEach(() => {
  mock = new MockAdapter(axios);
  mock.onGet("https://jsonplaceholder.typicode.com/posts/1").reply(200, {
    title: "mocked title",
  });
  queryClient = new QueryClient();
  usePlaceholderStore.setState({ thing: null });
});

afterEach(() => {
  mock.restore();
});

// Placeholder test to see how we can test components w/ zustand & tanstack
describe("App Component with Zustand and TanStack Query", () => {
  it("fetches and displays data, and updates Zustand state", async () => {
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

    // Assert that Zustand store was updated
    expect(usePlaceholderStore.getState().thing).toBe("thing");
  });
});
