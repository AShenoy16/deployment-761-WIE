import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Example role models data
interface RoleModel {
  id: number;
  name: string;
  title: string;
  info: string;
  image: string;
}

const roleModels: RoleModel[] = [
  {
    id: 1,
    name: "Alyssa Morris",
    title: "Product Manager, Intel",
    info: "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    image:
      "https://www.womeninscience.africa/wp-content/uploads/2022/11/Unsung-Black-Female-Engineers.jpg", // Placeholder for the image you uploaded
  },
  {
    id: 2,
    name: "Samantha Smith",
    title: "Software Engineer, Google",
    info: "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    image:
      "https://nzmanufacturer.co.nz/wp-content/uploads/2023/08/Women-In-Engineering-PIC.jpg",
  },
  // Add more role models as needed
];

const RoleModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small

  const handleCardClick = (id: number) => {
    navigate(`/rolemodel/${id}`);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        marginY={4}
        sx={{ color: "#00467F" }}
      >
        Engineering Role Models
      </Typography>

      {/* Column layout for the role model cards */}
      <Box display="flex" flexDirection="column" gap={3}>
        {roleModels.map((model) => (
          <Card
            key={model.id}
            sx={{
              display: "flex",
              borderRadius: 4,
              alignItems: "center",
              flexDirection: isSmallScreen ? "column" : "row", // Switch layout based on screen size
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row", // Image above text on small screens
                alignItems: "center",
                paddingX: 3,
              }}
              onClick={() => handleCardClick(model.id)}
            >
              {/* Text content */}
              <CardContent
                sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
              >
                <Typography variant="h6" component="div">
                  {model.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {model.info}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {model.title}
                </Typography>
              </CardContent>

              {/* Image */}
              <CardMedia
                component="img"
                sx={{
                  width: 150, // Adjust width as needed
                  height: 150, // Adjust height as needed
                  borderRadius: "50%",
                  objectFit: "cover", // Ensures image fits nicely
                  margin: 2, // Spacing around the image
                }}
                image={model.image}
                alt={model.name}
              />
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default RoleModelsPage;
