import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import GeneralLayout from "./layouts/GeneralLayout";
import QuizResultsPage from "./pages/QuizResultsPage";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <GeneralLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/results" element={<QuizResultsPage />} />
          </Routes>
        </GeneralLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
