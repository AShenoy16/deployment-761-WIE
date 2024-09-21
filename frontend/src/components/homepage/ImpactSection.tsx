import React, { ReactNode } from "react";
import { Box, Typography, Stack, CardMedia } from "@mui/material";

interface ImpactSectionProps {
  header: string;
  text: ReactNode; // Change text prop to accept ReactNode
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ header, text }) => {
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
        {header}
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
            component="div" // Change component to "div" to wrap ReactNodes properly
            gutterBottom
            sx={{
              color: "black",
            }}
          >
            {text}
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
