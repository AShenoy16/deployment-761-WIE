import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../components/homepage/HeroSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";
import ImpactSection from "../components/homepage/ImpactSection";
import { Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import CardSection from "../components/homepage/CardSection";
import EditHomepageModal from "../components/homepage/EditHomepageModal";
import { useAuthStore } from "../stores/AuthenticationStore";
import { useSnackbarStore } from "../stores/SnackBarStore";

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
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [openModal, setOpenModal] = useState(false);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const { message, isOpen, setIsOpen, setMessage } = useSnackbarStore();

  const formatTextWithParagraphs = (text: string) => {
    return text.split("\n").map((paragraph, index) => (
      <p key={index} style={{ marginBottom: "16px" }}>
        {paragraph}
      </p>
    ));
  };

  const handleSubmit = async (data: HomePageData) => {
    try {
      await fetch(`${API_URL}/homepage`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setHomeData(data);
      setOpenModal(false);
      setMessage("Changes saved successfully!");
      setIsOpen(true);
    } catch (error) {
      console.error("Error updating homepage data:", error);
      setMessage("Error updating homepage data.");
      setIsOpen(true);
    }
  };

  const severity =
    message === "Please fill out all required fields." ||
    message === "Error updating homepage data."
      ? "error"
      : "success";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/homepage`);
        setHomeData(response.data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (loading) return <CircularProgress />;
  if (!homeData) return <div>No data available</div>;

  const buttonStyle = {
    textTransform: "none",
    borderRadius: "12px",
  };

  return (
    <div>
      <HeroSection
        title={homeData.heroTitle}
        subtitle={homeData.heroSubtitle}
        image={homeData.heroImage}
      />

      <Box sx={{ backgroundColor: "#009AC7", height: "20px" }} />

      {isAdminLoggedIn && (
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Button
            variant="contained"
            color="secondary"
            sx={buttonStyle}
            onClick={() => setOpenModal(true)}
          >
            Edit
          </Button>
        </Box>
      )}

      <EditHomepageModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        initialData={homeData}
        onSubmit={handleSubmit}
      />

      <ImpactSection
        header={homeData.section1Header}
        text={formatTextWithParagraphs(homeData.section1Text)}
      />
 
      <SpecialisationSection
        header={homeData.section2Header}
        text={formatTextWithParagraphs(homeData.section2Text)}
      />

      <Box sx={{ backgroundColor: "#009AC7", height: "20px" }} />

      <CardSection resources={homeData.additionalResources} />

      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
      >
        <Alert onClose={() => setIsOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
