import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import SpecPage from "./pages/SpecPage";
import SpecDetailPage from "./pages/SpecDetailPage";
import GeneralLayout from "./layouts/GeneralLayout";
import QuizResultsPage from "./pages/QuizResultsPage";
import QuizEditingPage from "./pages/QuizEditingPage";

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
            <Route path="/quiz/edit" element={<QuizEditingPage />} />
            <Route path="/spec-info" element={<SpecPage />} />
            <Route path="/specialisation/:id" element={<SpecDetailPage />} />
          </Routes>
        </GeneralLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
