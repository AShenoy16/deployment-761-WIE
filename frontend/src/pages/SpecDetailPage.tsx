import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

import uoaEngBuilding from "../assets/engineering-building.jpg";


const SpecDetailPage = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Top Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${uoaEngBuilding})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "60px 20px",
          borderRadius: "8px",
          height: "300px", // Set a fixed height for the container
          display: "flex",
          alignItems: "center",
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
            borderRadius: "8px",
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
            sx={{ fontWeight: "bold" }}
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
          <Typography variant="h6" component="p">
            Software engineers are problem-solvers who design, develop, and
            optimize software systems that power the digital world.
          </Typography>
        </Box>
      </Box>

      {/* Impact Section */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#00467F", fontWeight: "bold" }}
              >
                Impact
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#00467F" }}>
                Software engineering is an innovative field that combines
                creativity and problem-solving to build the technology we use
                every day.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#00467F" }}>
                It allows you to design, develop, and maintain software systems
                that solve real-world challenges, from healthcare to business
                solutions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="body1" paragraph sx={{ color: "#00467F" }}>
                As a software engineer, you have the opportunity to make a
                significant impact by creating solutions that improve people’s
                lives and businesses. Your work can streamline processes,
                enhance user experiences, and bring innovation to industries
                like healthcare, education, and finance.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: "#00467F" }}>
                By building scalable, reliable software, you can help companies
                grow, empower individuals through accessible technology, and
                contribute to solving global challenges.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Career Pathways Section */}
      <Box
        sx={{
          marginTop: 4,
          backgroundColor: "#00467F",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Career Pathways
        </Typography>
        <Typography variant="h6" gutterBottom>
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
    </Container>
  );
};

export default SpecDetailPage;
