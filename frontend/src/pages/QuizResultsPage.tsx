import {
  Box,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetQuizResults } from "../hooks/useGetQuizResults";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import { SpecSummary } from "../util/mockResultsData";

const QuizResultsPage = () => {
  const { quizResults, isLoading, isError } = useGetQuizResults();

  if (isLoading) {
    return <LoadingSpinnerScreen />;
  }

  if (isError) {
    return <div>Error loading quiz results</div>;
  }

  return (
    <Stack alignItems="center" margin="auto" gap={2}>
      <Box>
        <Typography variant="h2">Here's Your Top 3</Typography>
        <Typography variant="body1" textAlign="center">
          Click to find out more!
        </Typography>
      </Box>

      <Stack direction="row" gap={2}>
        {quizResults.map((spec, index) => (
          <SpecCard key={index} {...spec} />
        ))}
      </Stack>

      {
        // todo: implement download functionality & error and success alerts
      }
      <Typography variant="h5">Download Results</Typography>
    </Stack>
  );
};

export const SpecCard: React.FC<SpecSummary> = ({
  name,
  description,
  careerPathways,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p={2}
      gap={1}
      width="100%"
    >
      <Typography variant="h5">{name}</Typography>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        sx={{
          backgroundColor: "#00467F",
          width: 350,
          minHeight: 400,
          borderRadius: "2rem",
          position: "relative", // Ensure content on top is positioned correctly
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <CardContent sx={{ color: "white" }}>
          <Typography variant="h6" textAlign="center">
            Career Pathways
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 2 }}>
            {careerPathways.map((pathway, index) => (
              <ListItem key={index} sx={{ display: "list-item", p: 0 }}>
                <ListItemText primary={pathway} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        {hovered && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: 1,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent overlay
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography textAlign="center">{description}</Typography>
            <Link href="/">Click to find out more</Link>
          </Box>
        )}
      </Card>
    </Stack>
  );
};

export default QuizResultsPage;
