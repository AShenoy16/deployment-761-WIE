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
import { IRoleModel } from "../../types/RoleModel";

interface RoleModelCardProps {
  model: IRoleModel;
  onClick: (model: IRoleModel) => void;
}

const RoleModelCard: React.FC<RoleModelCardProps> = ({ model, onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: "white", // White background for a clean look
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow for modern feel
        transition: "0.3s", // Smooth transition for hover effects
        "&:hover": {
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)", // Elevate shadow on hover
        },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          padding: 2, // Add padding for spacing
        }}
        onClick={() => onClick(model)}
      >
        {/* Use photoUrl for the image */}
        <CardMedia
          component="img"
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: isSmallScreen ? 0 : 2,
            marginBottom: isSmallScreen ? 2 : 0,
          }}
          image={model.photoUrl}
          alt={model.name}
        />

        <CardContent
          sx={{
            flex: 1,
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ color: theme.palette.primary.main }} // Purple color for the name
          >
            {model.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            {" "}
            {/* Black text for description */}
            {model.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "black", marginTop: 1 }}>
            {" "}
            {/* Black text for title */}
            {model.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoleModelCard;
