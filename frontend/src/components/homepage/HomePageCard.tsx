import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Card as HomePageCardProps } from "../../pages/HomePage";

const HomePageCard: React.FC<HomePageCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener noreferrer");
    } else {
      navigate(link);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 325,
        display: "flex",
        flexDirection: "column", // Ensure the content and actions are stacked vertically
        justifyContent: "space-between", // Spread content and align button at the bottom
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="160"
        sx={{ minWidth: "350px", maxHeight: "200px" }}
        image={image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Ensure content grows to fill space */}
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Limit to 3 lines before adding "..."
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ marginLeft: "0.5em" }}
          size="small"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomePageCard;
