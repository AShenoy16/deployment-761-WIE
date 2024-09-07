import {
  Stack,
  alpha,
  TextField,
  Typography,
  Box,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { sliderLabels } from "./SliderQuizQuestion";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const SpecialisationOption: React.FC = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap={10}
    >
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="white"
        borderRadius="2rem"
        width="40%"
        p={0.7}
      >
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <Typography ml={2}>Specialisation</Typography>
      </Stack>

      <Stack
        direction="row"
        bgcolor="white"
        width="50%"
        borderRadius="2rem"
        gap={5}
        justifyContent="center"
        p={0.8}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="2.5rem"
          height="2.5rem"
          bgcolor="#f5e1a4"
          borderRadius="50%"
        >
          <Typography>-4</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="2.5rem"
          height="2.5rem"
          bgcolor="#f5e1a4"
          borderRadius="50%"
        >
          <Typography>-4</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="2.5rem"
          height="2.5rem"
          bgcolor="#f5e1a4"
          borderRadius="50%"
        >
          <Typography>-4</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="2.5rem"
          height="2.5rem"
          bgcolor="#f5e1a4"
          borderRadius="50%"
        >
          <Typography>-4</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="2.5rem"
          height="2.5rem"
          bgcolor="#f5e1a4"
          borderRadius="50%"
        >
          <Typography>10</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

const SliderQuestionEditor: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack
      maxHeight={500}
      overflow="auto"
      padding={3}
      bgcolor={alpha(theme.palette.secondary.main, 0.17)}
      borderRadius={theme.shape.borderRadius}
      sx={{ scrollbarWidth: "thin" }}
      alignItems={"center"}
      spacing={2}
    >
      <TextField
        label="Question Text"
        sx={{
          margin: "auto",
          maxWidth: "500px",
          width: "100%",
        }}
      />

      <Stack direction="row" width="90%">
        <Button startIcon={<AddIcon />} variant="outlined">
          Spec
        </Button>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
          spacing={5.75}
        >
          {sliderLabels.map((label, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="2rem"
              height="2rem"
            >
              <Typography variant="body2" textAlign="center">
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <SpecialisationOption />
      <SpecialisationOption />
      <SpecialisationOption />
      <SpecialisationOption />
    </Stack>
  );
};

export default SliderQuestionEditor;
