import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";

type RequirementsCardProps = {
  title: string;
  requiredScore: number;
  requirements: string[];
};
const RequirementsCard: React.FC<RequirementsCardProps> = ({
  title,
  requiredScore,
  requirements,
}) => {
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
            {title}
          </Typography>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Required
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {requiredScore}
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
            {requirements.map((req, idx) => (
              <ListItem key={idx} sx={{ display: "list-item" }}>
                <Typography variant="h6" fontWeight="bold">
                  {req}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RequirementsCard;
