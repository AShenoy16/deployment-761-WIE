import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Specialisation {
  _id: string;
  name: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Make sure to set this in your environment variables

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
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        paddingTop={2}
        paddingBottom={2}
        sx={{ color: "#00467F" }}
      >
        Specialisations
      </Typography>

      <Grid container spacing={3} paddingTop={3}>
        {specialisations.map((spec) => (
          <Grid item xs={12} sm={6} md={4} key={spec._id}>
            <Card
              sx={{
                backgroundColor: "#00467F",
                color: "white",
                borderRadius: 4,
              }}
            >
              <CardActionArea onClick={() => handleCardClick(spec.name)}>
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
    </Container>
  );
};

export default SpecPage;
