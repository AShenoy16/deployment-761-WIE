import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Link,
} from "@mui/material";
import uoaEngBuilding from "/engineering-building.jpg";
import wenLogo from "../assets/wen-logo.png";
import HeroSection from "../components/homepage/HeroSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <SpecialisationSection />
    </div>
  );
};

export default HomePage;
