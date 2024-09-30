import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useAuthStore } from "../stores/AuthenticationStore";
import RequirementsCard from "../components/highschool_requirements/RequirementsCard";
import EditHighschoolModal from "../components/highschool_requirements/EditHighschoolModal";
import { HighschoolRequirement } from "../types/HighschoolRequirements";
import { useState } from "react";

const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
};

const highschoolRequirementsData: HighschoolRequirement[] = [
  {
    title: "NCEA",
    requiredScore: 260,
    requirements: [
      "17 external Level 3 credits in Calculus",
      "16 external Level 3 credits in Physics",
    ],
  },
  {
    title: "CIE",
    requiredScore: 310,
    requirements: ["Mathematics and Physics at A Levels"],
  },
  {
    title: "IB",
    requiredScore: 33,
    requirements: ["Mathematics and Physics at HL Levels"],
  },
];

const HighschoolRequirementsPage = () => {
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [open, setOpen] = useState(false);

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
        highschoolRequirementsData={highschoolRequirementsData}
        open={open}
        onClose={() => setOpen(false)}
      />

      <Grid container spacing={5}>
        {highschoolRequirementsData.map((req, idx) => (
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
