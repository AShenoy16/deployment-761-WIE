import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../util/common";
import AnimatedContainer from "../components/AnimatedContainer";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";

interface Specialisation {
  _id: string;
  name: string;
}

// Utility function to slugify specialisation names
export const slugify = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const SpecPage: React.FC = () => {
  const navigate = useNavigate();
  const [specialisations, setSpecialisations] = useState<Specialisation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialisations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/specializations`);
        setSpecialisations(response.data);
      } catch (err) {
        console.error("Error fetching specialisations:", err);
        setError("Failed to load specialisations.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialisations();
  }, []);

  const handleCardClick = (name: string) => {
    const slug = slugify(name);
    navigate(`/specialisation/${slug}`);
  };

  if (loading) {
    return <LoadingSpinnerScreen />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      <AnimatedContainer delay={0.15}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          mt={4}
          paddingBottom={2}
          sx={{ color: "#00467F" }}
        >
          Specialisations
        </Typography>
      </AnimatedContainer>

      <AnimatedContainer delay={0.3}>
        <Grid container spacing={3} paddingTop={1} pb={2}>
          {specialisations.map((spec) => (
            <Grid item xs={12} sm={6} key={spec._id}>
              <Card
                sx={{
                  backgroundColor: "#00467F",
                  color: "white",
                  borderRadius: 4,
                  height: "85px",
                }}
              >
                <CardActionArea
                  onClick={() => handleCardClick(spec.name)}
                  sx={{
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" component="h2">
                      {spec.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AnimatedContainer>
    </Container>
  );
};

export default SpecPage;
