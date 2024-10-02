import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import PieChart from "./PieChart";
import React from "react";
import { usePDF } from "react-to-pdf";
import { useSnackbarStore } from "../../stores/SnackBarStore";
import useSnackBar from "../../hooks/useSnackBar";

type ResultsBreakdownProps = {
  pieChartData: { name: string; score: number }[];
};

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({
  pieChartData,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const message = useSnackbarStore((state) => state.message);
  const isOpen = useSnackbarStore((state) => state.isOpen);
  const severity = useSnackbarStore((state) => state.severity);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);
  const handleSnackBarClose = (): void => setIsOpen(false);
  const showSnackbar = useSnackBar();

  const { toPDF, targetRef } = usePDF({ filename: "quiz_results.pdf" });

  const saveResultsAsPDF = () => {
    try {
      toPDF();
      showSnackbar("Successfully downloaded results as PDF", true);
    } catch {
      showSnackbar("Error saving results as PDF", false);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant={isSmallScreen ? "h4" : "h2"} mb={2}>
        Results Breakdown
      </Typography>
      <Box ref={targetRef}>
        <PieChart data={pieChartData} />
      </Box>
      <Box>
        <Button onClick={() => saveResultsAsPDF()}>Download Results</Button>
      </Box>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={() => setIsOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResultsBreakdown;
