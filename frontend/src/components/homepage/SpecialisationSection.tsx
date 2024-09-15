import React from "react";
import { Box, Typography, Stack, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slideshow from "./Slideshow";
import { specialisations } from "./specialisationsData";

const SpecialisationSection: React.FC = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    textTransform: "none",
    borderRadius: "12px",
    marginTop: "0.7em",
  };

  const handleSpecButtonClick = () => {
    navigate("/spec-info");
  };

  const handleQuizButtonClick = () => {
    navigate("/quiz");
  };

  return (
    <Box
      sx={{
        padding: { xs: "2em 3em", md: "2em 12em 0em 12em", xl: "2em 20em" },
        textAlign: "center",
        color: "#00467F",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
        }}
      >
        Discover the Right Engineering Path for You
      </Typography>
      <Stack
        direction={{ md: "column", lg: "row" }}
        marginTop={3}
        spacing={7}
        alignItems="center"
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={{ md: "center", lg: "flex-start" }}
          marginBottom={{ xs: "2em", md: 0 }}
        >
          <Typography
            variant="h6"
            component="p"
            textAlign={"left"}
            sx={{
              flex: 1, // Ensures equal width
              color: "black",
              fontSize: "1.1rem",
            }}
          >
            Engineering is diverse, offering various career pathways depending
            on your interests and skills. Whether you’re passionate about
            building the cities of the future, advancing healthcare, or
            developing cutting-edge software, there’s a specialisation for you
            at the University of Auckland.
          </Typography>
          <Link
            sx={{ mt: 1, color: "#00467F", textDecoration: "underline" }}
            href="/spec-info"
            underline="hover"
          >
            Learn more about UoA Engineering Specialisations
          </Link>
        </Box>

        <Slideshow slides={specialisations} />
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          textTransform: "none",
          borderRadius: "12px",
          marginTop: "0.7em",
          fontSize: "1.1rem",
        }}
        onClick={handleQuizButtonClick}
      >
        Find Your Ideal Specialisation with Our Quiz
      </Button>
    </Box>
  );
};

export default SpecialisationSection;
