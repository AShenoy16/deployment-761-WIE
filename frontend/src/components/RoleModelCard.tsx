// RoleModelCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Define the interface for props
interface RoleModel {
  id: number;
  name: string;
  title: string;
  info: string;
  image: string;
}

interface RoleModelCardProps {
  model: RoleModel;
  onClick: (model: RoleModel) => void;
}

const RoleModelCard: React.FC<RoleModelCardProps> = ({ model, onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
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
        }}
        onClick={() => onClick(model)}
      >
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

        {/* Text content */}
        <CardContent
          sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
        >
          <Typography variant="body2" color="textSecondary">
            {model.info}
          </Typography>
          <Typography variant="h6" component="div">
            {model.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {model.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoleModelCard;
