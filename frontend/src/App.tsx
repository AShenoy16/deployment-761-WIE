import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, Stack } from "@mui/material";
import { lightTheme } from "./theme";
import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Stack minHeight="100vh">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/quiz" />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
