import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

// Hard coded specialisations for now
const specialisations = [
  { id: 1, name: "Biomedical" },
  { id: 2, name: "Chemical and Materials" },
  { id: 3, name: "Civil" },
  { id: 4, name: "Computer Systems" },
  { id: 5, name: "Electrical and Electronic" },
  { id: 6, name: "Engineering Science" },
  { id: 7, name: "Mechanical" },
  { id: 8, name: "Mechatronics" },
  { id: 9, name: "Software" },
  { id: 10, name: "Structural" },
];

const SpecPage = () => {
  return (
    <Container>
      {/* Heading */}
      <Typography
        variant="h3"
        align="center"
        sx={{ marginTop: 4, marginBottom: 4, color: "#00467F" }}
      >
        Engineering Specialisations
      </Typography>

      {/* Specialisation Cards */}
      <Grid container spacing={3}>
        {specialisations.map((spec) => (
          <Grid item xs={12} sm={6} md={4} key={spec.id}>
            <Card sx={{ backgroundColor: "#00467F", color: "white" }}>
              <CardActionArea>
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
