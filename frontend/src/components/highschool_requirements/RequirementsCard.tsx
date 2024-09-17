import { Box, List, ListItem, Stack, Typography } from "@mui/material";

const RequirementsCard = () => {
  return (
    <Box>
      <Stack
        flexDirection="row"
        sx={{
          backgroundColor: "#EBEBEB",
          borderRadius: "1rem",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "#00467F",
            color: "white",
            width: "50%",
            borderRadius: "1rem",
            textAlign: "center",
          }}
          spacing={2}
          p={2}
        >
          <Typography variant="h4" fontWeight="bold">
            NCEA
          </Typography>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Required
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              260
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              Score
            </Typography>
          </Box>
        </Stack>
        <Stack
          pl={8}
          sx={{
            color: "#00467F",
          }}
        >
          <List sx={{ listStyleType: "disc", pl: 0 }}>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" fontWeight="bold">
                17 external Level 3 credits in Calculus
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <Typography variant="h6" fontWeight="bold">
                16 external Level 3 credits in Physics
              </Typography>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RequirementsCard;
