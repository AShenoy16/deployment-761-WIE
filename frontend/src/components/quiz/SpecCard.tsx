import {
  Stack,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
} from "@mui/material";
import { useState } from "react";
import { SpecSummary } from "../../util/mockResultsData";

const SpecCard: React.FC<SpecSummary> = ({
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

export default SpecCard;
