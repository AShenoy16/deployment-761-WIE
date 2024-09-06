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
          <Typography variant="h6" component="div">
            {model.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {model.description}
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
