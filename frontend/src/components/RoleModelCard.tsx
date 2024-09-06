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
import { RoleModel } from "../pages/RoleModelsPage";

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
        flexDirection: isSmallScreen ? "column" : "row",
        // Apply gradient background
        background: "linear-gradient(180deg, #009AC7 0%, #00467F 100%)",
        color: "white", // Ensure text is readable over the gradient
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
        }}
        onClick={() => onClick(model)}
      >
        {/* Updated to use photoUrl */}
        <CardMedia
          component="img"
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            margin: 2,
          }}
          image={model.photoUrl}
          alt={model.name}
        />

        <CardContent
          sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
        >
          <Typography variant="h6" component="div" sx={{ color: "white" }}>
            {model.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            {model.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "white" }}>
            {model.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoleModelCard;
