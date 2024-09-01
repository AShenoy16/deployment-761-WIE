import React from "react";
import { Grid, Typography, Box, Card, CardContent } from "@mui/material";
import uoaEngBuilding from "../assets/engineering-building.jpg";

const SpecDetailPage = () => {
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
            Software Engineering
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
            Software engineers are problem-solvers who design, develop, and
            optimize software systems that power the digital world.
          </Typography>
        </Box>
      </Box>

      {/* Impact Section */}
      <Box sx={{ minHeight: "100vh" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: "50vh" }}>
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
                  Software engineering is an innovative field that combines
                  creativity and problem-solving to build the technology we use
                  every day.
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
                  It allows you to design, develop, and maintain software
                  systems that solve real-world challenges, from healthcare to
                  business solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                backgroundImage: `url(${uoaEngBuilding})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Grid>
        </Grid>
        <Grid container>
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
                backgroundImage: `url(${uoaEngBuilding})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: "50vh", borderRadius: "0" }}>
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
                  As a software engineer, you have the opportunity to make a
                  significant impact by creating solutions that improve people's
                  lives and businesses. Your work can streamline processes,
                  enhance user experiences, and bring innovation to industries
                  like healthcare, education, and finance.
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
                  By building scalable, reliable software, you can help
                  companies grow, empower individuals through accessible
                  technology, and contribute to solving global challenges.
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
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.5rem",
            },
          }}
        >
          Potential Career options as a Software Engineer Graduate
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ul>
              <li>Software Engineer</li>
              <li>Software Tester</li>
              <li>AI/Machine Learning Engineer</li>
              <li>IT Consultant</li>
              <li>Information Systems Manager</li>
              <li>Game Developer</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <ul>
              <li>Application Analyst</li>
              <li>Database Administrator</li>
              <li>Forensic Computer Analyst</li>
              <li>IT Technical Support Officer</li>
              <li>Systems Analyst</li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SpecDetailPage;
