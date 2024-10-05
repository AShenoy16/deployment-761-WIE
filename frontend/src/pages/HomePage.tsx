import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import HeroSection from "../components/homepage/HeroSection";
import SpecialisationSection from "../components/homepage/SpecialisationSection";
import ImpactSection from "../components/homepage/ImpactSection";
import { Box, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import CardSection from "../components/homepage/CardSection";
import EditHomepageModal from "../components/homepage/EditHomepageModal";
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

  const handleSaveChanges = (updatedData: HomePageData) => {
    setHomeData(updatedData); // Update state with the new data
  };

  const handleSubmit = async (data: HomePageData) => {
    const formData = new FormData();

    // Append fields to formData, including the file
    formData.append("heroTitle", data.heroTitle);
    formData.append("heroSubtitle", data.heroSubtitle);

    // If heroImage is a File, append it to FormData
    if (data.heroImage) {
      formData.append("heroImage", data.heroImage); // heroImage is a file
    }

    formData.append("section1Header", data.section1Header);
    formData.append("section1Text", data.section1Text);
    formData.append("section2Header", data.section2Header);
    formData.append("section2Text", data.section2Text);

    // Convert additionalResources to JSON and append it
    formData.append(
      "additionalResources",
      JSON.stringify(data.additionalResources)
    );

    try {
      const response = await fetch(`${API_URL}/homepage`, {
        method: "PATCH",
        // Don't set Content-Type manually when using FormData
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error updating homepage data");
      }

      setHomeData(data); // Update state with the new data
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
