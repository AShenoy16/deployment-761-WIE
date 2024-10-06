import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import AnimatedContainer from "../AnimatedContainer";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <Box
      role="banner"
      sx={{
        position: "relative",
        backgroundImage: `url(/engineering-building.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: { xs: "40px 20px", sm: "40px 0px 40px 20px" },
        display: "flex",
        alignItems: "center",
        height: {
          xs: "calc(100vh - 4.5rem - 20px)",
          sm: "calc(100vh - 5rem - 20px)",
          md: "calc(100vh - 5.5rem - 20px)",
        },
        justifyContent: {
          xs: "center",
          sm: "center",
          md: "center",
          lg: "flex-end",
        },
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      />
      {/* Content */}
      <AnimatedContainer animationType="slideUp" delay={0.25}>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "left",
            backgroundColor: "white",
            paddingX: "3em",
            paddingY: { xs: "2em", md: "3em" },
            color: "#00467F",
            borderRadius: "3px",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 3, md: 10 }}
            alignItems={"center"}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  maxWidth: { xs: "100%", sm: "80%", md: "85%" },
                }}
              >
                {subtitle}
              </Typography>
            </Box>

            <Box
              component="img"
              sx={{ maxHeight: { xs: 130, md: 190 }, borderRadius: "3px" }}
              src={image}
            />
          </Stack>
        </Box>
      </AnimatedContainer>
    </Box>
  );
};

export default HeroSection;
