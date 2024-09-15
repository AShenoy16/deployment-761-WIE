import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import uoaEngBuilding from "/engineering-building.jpg";
import wenLogo from "../assets/wen-logo.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleQuizButtonClick = () => {
    navigate("/quiz");
  };

  return (
    <div>
      <p>HomePage</p>
      <button onClick={handleQuizButtonClick}>Temporary quiz button</button>
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
              xs: "40px 20px 40px 20px",
              sm: "40px 0px 40px 20px",
            },
            display: "flex",
            alignItems: "center",
            height: "40em",
            justifyContent: { sm: "center", md: "center", lg: "flex-end" },
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
              backgroundColor: "white",
              paddingX: "3em",
              paddingY: { xs: "2em", sm: "5em" },
              color: "#00467F",

              // marginLeft: {
              //   xs: "20px",
              //   sm: "50px",
              // },
              // maxWidth: {
              //   xs: "calc(100% - 1px)",
              //   sm: "600px",
              //   md: "50%",
              // },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 3, md: 10 }}
              alignItems={"center"}
              textAlign={{ xs: "center", sm: "left" }}
            >
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "4rem",
                    },
                  }}
                >
                  {"Women in Engineering"}
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
                    maxWidth: { xs: "100%", sm: "80%", md: "85%" },
                  }}
                >
                  {"Towards more diversity in Engineering"}
                </Typography>
              </Box>
              {/* Edit Button */}
              {/* {isAdminLoggedIn && (
              <Box mt={"3rem"}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEditModalOpen}
                  sx={buttonStyle}
                >
                  Edit
                </Button>
              </Box>
            )} */}

              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 120, md: 140 },
                }}
                src={wenLogo}
              />
            </Stack>
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
                    {"left detail"}
                  </Typography>

                  {/* Edit Modal */}
                  {/* <EditModalSpecInfo
                    open={openEditModal}
                    onClose={handleEditModalClose}
                    specInfoResult={specialization}
                    name={formattedName}
                    onSave={handleSaveChanges}
                  /> */}
                </CardContent>
              </Card>
            </Grid>

            {/* Left Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${uoaEngBuilding})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
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
                  backgroundImage: `url(${uoaEngBuilding})`,
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
                    {"right detail text "}
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
            {`Potential Career options as a ${"engineer"} Graduate`}
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
                {/* {specialization.careerPathways
                  .slice(0, 6)
                  .map((pathway, index) => (
                    <li key={index}>{pathway}</li>
                  ))} */}
                "more text"
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
