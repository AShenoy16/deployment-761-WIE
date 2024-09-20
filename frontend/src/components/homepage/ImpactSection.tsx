import React from "react";
import { Box, Typography, Stack, Button, Link, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImpactSection: React.FC = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    textTransform: "none",
    borderRadius: "12px",
    marginTop: "0.7em",
  };

  return (
    <Box
      sx={{
        padding: { xs: "2em 3em", md: "2em 12em 2em 12em", xl: "2em 20em" },
        color: "#00467F",
        alignItems: { md: "center", lg: "flex-start" },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Why Engineering?
      </Typography>
      <Stack
        direction={{ md: "column", lg: "row" }}
        marginTop={3}
        spacing={10}
        alignItems={"center"}
      >
        <Box>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{
              color: "black",
            }}
          >
            Engineering is more than just solving problems—it’s about creating
            solutions that impact every part of society. Engineers tackle
            climate change, create clean energy, design sustainable cities,
            improve healthcare, and drive technological advancements. When you
            become an engineer, you have the power to change the world for the
            better.
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{
              color: "black",
              marginTop: "1em",
            }}
          >
            Imagine designing the cities of tomorrow, developing renewable
            energy technologies, or creating medical devices that save lives.
            Engineers make all of this possible—and so much more.
          </Typography>
        </Box>
        <CardMedia
          component="iframe"
          title="test"
          src="https://www.youtube.com/embed/_55adK4RXF8?si=ekGykN8KPyNF9v4z"
          sx={{
            width: "100%", // Takes up full width of container
            maxWidth: "560px", // Max width for larger screens
            aspectRatio: "16/9", // Ensures the aspect ratio is 16:9
            borderRadius: "8px", // Optional: adds some rounded corners
            border: "none", // Removes default iframe border
          }}
        />
      </Stack>
    </Box>
  );
};

export default ImpactSection;
