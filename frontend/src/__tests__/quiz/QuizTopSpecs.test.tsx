import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import QuizTopSpecs from "../../components/quiz/QuizTopSpecs";
import { SpecSummary } from "../../types/Specialization";
import { ThemeProvider, createTheme } from "@mui/material";
import { slugify } from "../../pages/SpecPage";

jest.mock("../../util/common", () => ({
  API_BASE_URL: "mockApi.com",
}));

const quizResults: SpecSummary[] = [
  {
    name: "Software Engineering",
    description: "Focuses on software development.",
    careerPathways: ["Software Developer", "DevOps Engineer"],
    score: 90,
  },
  {
    name: "Civil Engineering",
    description: "Focuses on infrastructure development.",
    careerPathways: ["Civil Engineer", "Structural Engineer"],
    score: 80,
  },
  {
    name: "Electrical Engineering",
    description: "Focuses on electrical systems.",
    careerPathways: ["Electrical Engineer", "Power Systems Engineer"],
    score: 85,
  },
];

describe("QuizTopSpecs", () => {
  const theme = createTheme();

  it("renders the top 3 specializations in the correct order", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuizTopSpecs quizResults={quizResults} />
      </ThemeProvider>
    );

    const podiumTitles = screen.getAllByRole("heading", { level: 6 });

    expect(podiumTitles[0]).toHaveTextContent("Civil Engineering"); // 1st place
    expect(podiumTitles[1]).toHaveTextContent("Software Engineering"); // 2nd place
    expect(podiumTitles[2]).toHaveTextContent("Electrical Engineering"); // 3rd place
  });

  it("displays the correct ordinal suffix for each podium position", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuizTopSpecs quizResults={quizResults} />
      </ThemeProvider>
    );

    const podiumRanks = screen.getAllByText(/1st|2nd|3rd/);

    expect(podiumRanks[0]).toHaveTextContent("2nd");
    expect(podiumRanks[1]).toHaveTextContent("1st");
    expect(podiumRanks[2]).toHaveTextContent("3rd");
  });

  it("links to the correct specialization page", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuizTopSpecs quizResults={quizResults} />
      </ThemeProvider>
    );

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute(
      "href",
      `/specialisation/${slugify("Civil Engineering")}`
    );
    expect(links[1]).toHaveAttribute(
      "href",
      `/specialisation/${slugify("Software Engineering")}`
    );
    expect(links[2]).toHaveAttribute(
      "href",
      `/specialisation/${slugify("Electrical Engineering")}`
    );
  });
});
