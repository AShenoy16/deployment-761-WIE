import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          {/** REMOVE DEFAULT NAVIGATION LATER */}
          <Route path="/" element={<Navigate to="/quiz" />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
