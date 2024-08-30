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

const QuizResultsPage = () => {
  return (
    <Stack>
      <Typography variant="h2">Here's Your Top 3</Typography>
      <Typography variant="body1">Click to find out more!</Typography>

      {
        // cards of top 3 recommended specs go here
      }

      <SpecCard />

      {
        // todo: implement download functionality & error and success alerts
      }
      <Typography>Download Results</Typography>
    </Stack>
  );
};

// todo: add props for spec data
const SpecCard = () => {
  const [hovered, setHovered] = useState(false);

  const careerPathways = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Software Architect",
  ];

  return (
    <Box>
      <Typography variant="h5">Software Engineering</Typography>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          backgroundColor: "#00467F",
          maxWidth: 250,
          minHeight: 300,
          borderRadius: "0.75rem",
          position: "relative", // Ensure content on top is positioned correctly
          overflow: "hidden", // Hide any overflow
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <CardContent sx={{ color: "white" }}>
          <Typography variant="h6">Career Pathways</Typography>
          <List sx={{ listStyleType: "disc", pl: 1 }}>
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
            <Typography>Software Engineers are problem solvers</Typography>
            <Link href="/">Click to find out more</Link>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default QuizResultsPage;
