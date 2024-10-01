import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useAuthStore } from "../stores/AuthenticationStore";
import RequirementsCard from "../components/highschool_requirements/RequirementsCard";
import EditHighschoolModal from "../components/highschool_requirements/EditHighschoolModal";
import { useState } from "react";
import { useHighschoolRequirements } from "../hooks/useHighschoolRequirements";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";

const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
};

const HighschoolRequirementsPage = () => {
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [open, setOpen] = useState(false);
  const { highschoolRequirements, isLoading, isError } =
    useHighschoolRequirements();

  if (isLoading) {
    return <LoadingSpinnerScreen />;
  }

  if (isError) {
    return <Box>Failed to get highschool requirements</Box>;
  }

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
          <Button
            variant="contained"
            color="secondary"
            sx={buttonStyle}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
        </Box>
      )}

      <EditHighschoolModal
        highschoolRequirementsData={highschoolRequirements}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Grid container spacing={5}>
        {highschoolRequirements.map((req, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <RequirementsCard {...req} />
          </Grid>
        ))}

        <Grid item xs={12} sm={6}>
          <Typography
            color="#00467F"
            fontStyle="italic"
            fontWeight="bold"
            textAlign="center"
          >
            {`If your rank score is slightly lower than the guaranteed score, we
        encourage you to still apply. We will consider your application if
        places are available. If you don't meet the requirement. For Cambridge
        International students, AS Mathematics and Physics may be accepted based
        on the level of grade achieved. For IB students, SL Physics and SL
        Mathematics “Analysis and Approaches” may be accepted based on the level
        of grade achieved. SL Mathematics “ Applications and interpretation”
        will not be accepted.`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HighschoolRequirementsPage;
