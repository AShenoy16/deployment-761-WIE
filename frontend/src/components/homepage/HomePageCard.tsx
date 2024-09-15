import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface HomePageCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const HomePageCard: React.FC<HomePageCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  const navigate = useNavigate();

  // Function to handle button click
  const handleLearnMoreClick = () => {
    if (link.startsWith("http")) {
      // External link: open in a new tab
      window.open(link, "_blank", "noopener noreferrer");
    } else {
      // Internal link: use React Router to navigate
      navigate(link);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={title} height="160" image={image} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ marginLeft: "0.5em" }}
          size="small"
          onClick={handleLearnMoreClick} // Call the function on click
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomePageCard;
