import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../components/homepage/HeroSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";
import ImpactSection from "../components/homepage/ImpactSection";
import { Box, Button, CircularProgress } from "@mui/material";
import CardSection from "../components/homepage/CardSection";
import EditHomepageModal from "../components/homepage/EditHomepageModal";

interface Card {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface HomePageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  section1Header: string;
  section1Text: string;
  section2Header: string;
  section2Text: string;
  additionalResources: Card[];
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL; // Use your env variable

  const [openModal, setOpenModal] = useState(false);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);

  const handleSubmit = async (data: HomePageData) => {
    await fetch(`${API_URL}/homepage`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setHomeData(data); // Update local state
  };

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

      <Box sx={{ backgroundColor: "#009AC7", height: "20px" }} />
      <ImpactSection header={data.section1Header} text={data.section1Text} />
      <SpecialisationSection
        header={data.section2Header}
        text={data.section2Text}
      />
      <Box sx={{ backgroundColor: "#009AC7", height: "20px" }} />
      <CardSection resources={data.additionalResources} />

      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Edit Home Page
      </Button>
      <EditHomepageModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        initialData={data}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
