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
import RoleModelsPage from "./pages/RoleModelsPage";
import LoginPage from "./pages/LoginPage";
import AuthWrapper from "./components/AuthWrapper";

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
            <Route
              path="/quiz/edit"
              element={
                <AuthWrapper>
                  <QuizEditingPage />
                </AuthWrapper>
              }
            />
            <Route path="/spec-info" element={<SpecPage />} />
            <Route path="/specialisation/:id" element={<SpecDetailPage />} />
            <Route path="/role-models" element={<RoleModelsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </GeneralLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
