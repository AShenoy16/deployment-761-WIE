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
  Link,
} from "@mui/material";
import uoaEngBuilding from "/engineering-building.jpg";
import wenLogo from "../assets/wen-logo.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    textTransform: "none",
    borderRadius: "12px",
    marginTop: "0.7em",
  };

  const handleQuizButtonClick = () => {
    navigate("/quiz");
  };

  const handleSpecButtonClick = () => {
    navigate("/spec-info");
  };

  return (
    <div>
      <Box sx={{ overflowX: "hidden" }}>
        {/* Hero Section */}
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
              backgroundColor: "rgba(0, 0, 0, 0.55)",
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
              borderRadius: "3px",

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

        {/* Specialisation Section */}
        <Box
          sx={{
            padding: { xs: "2em 3em", md: "2em 8em" },
            textAlign: "center",
            color: "#00467F",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
            }}
          >
            Discover the Right Engineering Path for You
          </Typography>
          <Stack
            direction={{ sm: "column", md: "row" }}
            marginTop={3}
            paddingX={10}
            spacing={7}
            alignItems="center" // Ensures the content aligns vertically in the center for row layout
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
            >
              <Typography
                variant="h6"
                component="p"
                textAlign={"left"}
                sx={{
                  flex: 1, // Ensures equal width
                  color: "black",
                  fontSize: "1.1rem",
                }}
              >
                Engineering is diverse, offering various career pathways
                depending on your interests and skills. Whether you’re
                passionate about building the cities of the future, advancing
                healthcare, or developing cutting-edge software, there’s a
                specialisation for you at the University of Auckland.
              </Typography>
              <Link
                sx={{ mt: 1, color: "#00467F", textDecoration: "underline" }}
                href="/spec-info"
                underline="hover"
              >
                Find out more
              </Link>
              {/* <Button
                variant="contained"
                color="secondary"
                sx={buttonStyle}
                onClick={handleSpecButtonClick}
              >
                Learn more
              </Button> */}
              <Button
                variant="contained"
                color="secondary"
                sx={buttonStyle}
                onClick={handleQuizButtonClick}
              >
                Take the specialisation quiz
              </Button>
            </Box>

            <Box
              component="img"
              sx={{
                maxWidth: { xs: 300, sm: 350 },
                flex: 1, // Ensures equal width
                objectFit: "cover", // Ensures the image maintains aspect ratio
                marginTop: { xs: 3, md: 0 },
              }}
              src={
                "https://www.careers.govt.nz/assets/Posts/_resampled/ScaleWidthWyI3OTUiXQ/A-female-engineer-repairing-a-production-line-machine.jpg"
              }
            />
          </Stack>
        </Box>

        {/*Impact Section */}
        {/* Specialisation Section */}
      </Box>

      <p>HomePage</p>
      <button onClick={handleQuizButtonClick}>Temporary quiz button</button>
    </div>
  );
};

export default HomePage;
