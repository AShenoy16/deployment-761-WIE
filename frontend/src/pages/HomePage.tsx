import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../components/homepage/HeroSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";
import ImpactSection from "../components/homepage/ImpactSection";
import { Box, CircularProgress } from "@mui/material";
import CardSection from "../components/homepage/CardSection";

interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  section1Header: string;
  section1Text: string;
  section2Header: string;
  section2Text: string;
  additionalResources: {
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL; // Use your env variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/homepage`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (loading) return <CircularProgress />; // Show loading spinner while fetching data

  if (!data) return <div>No data available</div>; // Handle case where data is null

  return (
    <div>
      <HeroSection
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        image={data.heroImage}
      />
      <SpecialisationSection />
      <ImpactSection />
      <Box sx={{ backgroundColor: "#009AC7", height: "20px" }} />
      {/* <CardSection resources={data.additionalResources} /> */}
    </div>
  );
};

export default HomePage;
