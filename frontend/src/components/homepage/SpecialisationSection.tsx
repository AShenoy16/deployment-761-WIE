import React, { ReactNode } from "react";
import { Box, Typography, Stack, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slideshow from "./Slideshow";
import { specialisations } from "../../util/specialisationsData";
import AnimatedContainer from "../AnimatedContainer";

interface SpecialisationSectionProps {
  header: string;
  text: ReactNode; // Updated to ReactNode to support multiple elements like paragraphs
}

const SpecialisationSection: React.FC<SpecialisationSectionProps> = ({
  header,
  text,
}) => {
  const navigate = useNavigate();

  const handleQuizButtonClick = () => {
    navigate("/quiz");
  };

  return (
    <AnimatedContainer delay={0.15} animationType="slideUp">
      <Box
        sx={{
          padding: { xs: "2em 3em", md: "2em 12em 2em 12em", xl: "2em 20em" },
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
          {header}
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
              component="div" // Change component to div to allow multiple elements (ReactNode)
              textAlign={"left"}
              sx={{
                flex: 1, // Ensures equal width
                color: "black",
                fontSize: "1.1rem",
              }}
            >
              {text}
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
    </AnimatedContainer>
  );
};

export default SpecialisationSection;
