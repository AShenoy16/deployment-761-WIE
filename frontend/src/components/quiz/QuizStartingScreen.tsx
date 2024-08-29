import React from "react";
import {
  Stack,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const QuizStartingScreen: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={2}
      width="100%"
      height="100%"
    >
      <Typography variant={isSmallScreen ? "h4" : "h2"} textAlign="center">
        Find your spec with this quiz!
      </Typography>
      <Button variant="contained" size="large">
        Start
      </Button>
    </Stack>
  );
};

export default QuizStartingScreen;
