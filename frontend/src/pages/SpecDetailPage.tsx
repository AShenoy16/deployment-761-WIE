import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import uoaEngBuilding from "../assets/engineering-building.jpg";

const SpecDetailPage = () => {
  return (
    <div>
      {/* Top Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${uoaEngBuilding})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "60px 20px",
          display: "flex",
          alignItems: "center",
          height: "100vh",
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
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Adjust the opacity for tint strength
          }}
        />
        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "left", // Ensure the text is left-aligned
            maxWidth: "600px",
            marginLeft: "50px",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "5rem" }}
          >
            Software Engineering
          </Typography>
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "left", // Ensure the text is left-aligned
            }}
          ></Box>
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: "bold", fontSize: "2rem" }}
          >
            Software engineers are problem-solvers who design, develop, and
            optimize software systems that power the digital world.
          </Typography>
        </Box>
      </Box>

      {/* <Box sx={{ backgroundColor: "#00467F", height: "30px" }}></Box> */}

      {/* Impact Section */}
      <Box sx={{ height: "100vh" }}>
        <Grid container sx={{ height: "50%" }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stack the items vertically
                  justifyContent: "center", // Center vertically
                  height: "100%", // Ensure it takes up the full height of the card
                  marginLeft: "50px",
                  width: "80%",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    color: "#00467F",
                    fontWeight: "bold",
                    marginBottom: "30px",
                  }}
                >
                  Impact
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#00467F", fontWeight: "bold" }}
                >
                  Software engineering is an innovative field that combines
                  creativity and problem-solving to build the technology we use
                  every day.
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#00467F", fontWeight: "bold" }}
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
                height: "100%", // Ensure it fills the grid item's height
                backgroundImage: `url(${uoaEngBuilding})`,
                backgroundSize: "cover", // Cover the entire box
                backgroundPosition: "center", // Center the image
                display: "flex", // Use flexbox to align content
                alignItems: "center", // Vertically center content
                justifyContent: "center", // Horizontally center content
              }}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ height: "50%" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%", // Ensure it fills the grid item's height
                backgroundImage: `url(${uoaEngBuilding})`,
                backgroundSize: "cover", // Cover the entire box
                backgroundPosition: "center", // Center the image
                display: "flex", // Use flexbox to align content
                alignItems: "center", // Vertically center content
                justifyContent: "center", // Horizontally center content
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: "0" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stack the items vertically
                  alignItems: "center", // Center horizontally
                  justifyContent: "center", // Center vertically
                  height: "100%", // Ensure it takes up the full height of the card
                  width: "80%",
                  marginLeft: "50px",
                }}
              >
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#00467F", fontWeight: "bold" }}
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
                  sx={{ color: "#00467F", fontWeight: "bold" }}
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
            marginBottom: "10px", // Adds space between list items
          },
          fontWeight: "bold",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Career Pathways
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
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
    </div>
  );
};

export default SpecDetailPage;
