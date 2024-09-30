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
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { SpecSummary } from "../../types/Specialization";
import { slugify } from "../../pages/SpecPage";

type SpecCardProps = SpecSummary & { rank: number };

const SpecCard: React.FC<SpecCardProps> = ({
  name,
  description,
  careerPathways,
  rank,
}) => {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      p={2}
      gap={2}
      width="100%"
    >
      <Typography variant="h5" textAlign="center" width={450}>
        {rank}: {name}
      </Typography>
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
            <Link
              sx={{ color: `${theme.palette.primary.light}` }}
              href={`/specialisation/${slugify(name)}`}
            >
              Click to find out more
            </Link>
          </Box>
        )}
      </Card>
    </Stack>
  );
};

export default SpecCard;
