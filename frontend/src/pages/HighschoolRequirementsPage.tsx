import { Box, Button, Container, Typography } from "@mui/material";
import { useAuthStore } from "../stores/AuthenticationStore";

const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
};

const HighschoolRequirementsPage = () => {
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        marginY={4}
        fontWeight="bold"
        sx={{ color: "#00467F" }}
      >
        Highschool Entry Requirements
      </Typography>
      <Typography
        variant="h5"
        component="h1"
        mb={4}
        gutterBottom
        fontWeight="bold"
        sx={{ color: "#00467F" }}
      >
        You are guaranteed entry to the Engineering programme if you meet these
        requirements:
      </Typography>

      {/* Edit Button */}
      {isAdminLoggedIn && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}
        >
          <Button variant="contained" color="secondary" sx={buttonStyle}>
            Edit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default HighschoolRequirementsPage;
