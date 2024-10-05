import { Alert, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardSection from "../components/homepage/CardSection";
import EditHomepageModal from "../components/homepage/EditHomepageModal";
import HeroSection from "../components/homepage/HeroSection";
import ImpactSection from "../components/homepage/ImpactSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";
import { useAuthStore } from "../stores/AuthenticationStore";
import { useSnackbarStore } from "../stores/SnackBarStore";
import { API_BASE_URL } from "../util/common";

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
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [openModal, setOpenModal] = useState(false);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const { message, isOpen, setIsOpen } = useSnackbarStore();

  const formatTextWithParagraphs = (text: string) => {
    return text.split("\n").map((paragraph, index) => (
      <p key={index} style={{ marginBottom: "16px" }}>
        {paragraph}
      </p>
    ));
  };

  const handleSaveChanges = (updatedData: HomePageData) => {
    setHomeData(updatedData); // Update state with the new data
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

  return (
    <div>
      <HeroSection
        title={homeData.heroTitle}
        subtitle={homeData.heroSubtitle}
        image={`${API_BASE_URL}${homeData.heroImage}`}
      />

      <Box sx={{ backgroundColor: "#009AC7", height: "20px" }} />

      {isAdminLoggedIn && (
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Edit Home Page
          </Button>
        </Box>
      )}

      <EditHomepageModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        initialData={homeData}
        onSubmit={handleSaveChanges}
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
