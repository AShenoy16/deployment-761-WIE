import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom"; // To access route params
import uoaEngBuilding from "/engineering-building.jpg";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";

import axios from "axios";

// Define the interface for the Specialization object
interface Specialization {
  name: string;
  description: string;
  photoUrl: string;
  careerPathways: string[];
  startingSalary: number;
  medianSalary: number;
  experiencedSalary: number;
  jobAvailability: string;
  header: string;
  leftDetail: string;
  rightDetail: string;
  leftImage: string;
  rightImage: string;
}

const SpecDetailPage: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get specialization name from route params
  const [specialization, setSpecialization] = useState<Specialization | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);
  // Convert hyphenated name to a format the API expects
  const formattedName = name?.replace(/-/g, " ") || ""; 

  // Fetch specialization details from the backend
  useEffect(() => {
    const fetchSpecialization = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/specializations/${encodeURIComponent(
            formattedName
          )}`
        );
        setSpecialization(response.data);
      } catch (err) {
        console.error("Error fetching specialization:", err);
        setError("Failed to fetch specialization details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialization();
  }, [name]);

  // Handle loading and error states
  if (loading) return <LoadingSpinnerScreen/>;
  if (error) return <Typography>{error}</Typography>;
  if (!specialization) return <Typography>Specialization not found</Typography>;

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Top Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${uoaEngBuilding})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: {
            xs: "40px 20px",
            sm: "60px 20px",
          },
          display: "flex",
          alignItems: "center",
          minHeight: "100vh", // Ensure it at least covers the viewport height
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          }}
        />
        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "left",
            marginLeft: {
              xs: "20px",
              sm: "50px",
            },
            maxWidth: {
              xs: "calc(100% - 40px)",
              sm: "600px",
              md: "50%",
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "2.5rem",
                sm: "3rem",
                md: "5rem",
              },
              paddingBottom: "20px",
            }}
          >
            {specialization.name}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.2rem",
                sm: "1.5rem",
                md: "2rem",
              },
            }}
          >
            {specialization.header}
          </Typography>
        </Box>
      </Box>

      {/* Impact Section */}
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container>
          {/* Left Detail */}
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: "50vh", alignContent: "center" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: {
                    xs: "20px",
                    sm: "50px",
                  },
                  width: {
                    xs: "calc(100% - 40px)",
                    sm: "80%",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "#00467F",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: {
                      xs: "1.5rem",
                      sm: "2rem",
                      md: "2.5rem",
                    },
                  }}
                >
                  Impact
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: "#00467F",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {specialization.leftDetail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Left Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${specialization.leftImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Grid>
        </Grid>

        {/* Right Detail */}
        <Grid container>
          {/* Right Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${specialization.rightImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Grid>

          {/* Right Detail */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                minHeight: "50vh",
                borderRadius: "0",
                alignContent: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: {
                    xs: "calc(100% - 40px)",
                    sm: "80%",
                  },
                  marginLeft: {
                    xs: "20px",
                    sm: "50px",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    color: "#00467F",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {specialization.rightDetail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Career Pathways Section */}
      <Box
        sx={{
          backgroundColor: "#00467F",
          color: "white",
          padding: "20px",
          "& li": {
            marginBottom: "10px",
          },
          fontWeight: "bold",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          Career Pathways
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Potential Career options as a ${specialization.name} Graduate`}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            marginLeft: "10px",
            paddingTop: "20px",
          }}
        >
          <Grid item xs={12} md={6}>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridAutoRows: "auto",
                rowGap: "10px",
                columnGap: "20px",
                padding: 0,
                margin: 0,
              }}
            >
              {specialization.careerPathways
                .slice(0, 6)
                .map((pathway, index) => (
                  <li key={index}>{pathway}</li>
                ))}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SpecDetailPage;
