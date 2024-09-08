import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Specialisation {
  id: number;
  name: string;
}

const specialisations: Specialisation[] = [
  { id: 1, name: "Biomedical" },
  { id: 2, name: "Chemical and Materials" },
  { id: 3, name: "Civil" },
  { id: 4, name: "Computer Systems" },
  { id: 5, name: "Electrical and Electronic" },
  { id: 6, name: "Engineering Science" },
  { id: 7, name: "Mechanical" },
  { id: 8, name: "Mechatronics" },
  { id: 9, name: "Software Engineering" },
  { id: 10, name: "Structural" },
];

// Utility function to slugify specialisation names
const slugify = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

const SpecPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    const slug = slugify(id);
    navigate(`/specialisation/${slug}`);
  };

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
          <Grid item xs={12} sm={6} md={4} key={spec.id}>
            <Card
              sx={{
                backgroundColor: "#00467F",
                color: "white",
                borderRadius: 4,
              }}
            >
              <CardActionArea onClick={() => handleCardClick(spec.name)}>
                <CardContent>
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
