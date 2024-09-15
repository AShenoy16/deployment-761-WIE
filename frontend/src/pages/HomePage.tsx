import React from "react";

import HeroSection from "../components/homepage/HeroSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";
import ImpactSection from "../components/homepage/ImpactSection";
import { Box, Divider } from "@mui/material";
import CardSection from "../components/homepage/CardSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <SpecialisationSection />
      <ImpactSection />
      <Box
        sx={{
          backgroundColor: "#009AC7",
          height: "20px",
        }}
      ></Box>
      <CardSection />
    </div>
  );
};

export default HomePage;
