import React, { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { RoleModel } from "../types/RoleModel";
import EditModalRoleModels from "../components/rolemodel/EditModalRoleModels";

// Define modal styles
const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "800px",
  maxHeight: "90vh",
  bgcolor: "#009AC7", //TODO: needs linear background
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: 5,
};

const buttonStyle = {
  textTransform: "none",
  textDecorationLine: "underline",
  borderRadius: "12px",
};

// temporarily hard coded with mocked data
const mockRoleModelData: RoleModel[] = [
  {
    name: "Jane",
    description: "hi hi",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/a6/Pokémon_Pikachu_art.png",
    socialMediaLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Adi",
    description: "bye bye",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/a6/Pokémon_Pikachu_art.png",
    socialMediaLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Adi",
    description: "bye bye",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/a6/Pokémon_Pikachu_art.png",
    socialMediaLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const RoleModelsPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      minHeight="100vh"
    >
      {/* Edit Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={buttonStyle}
      >
        Edit
      </Button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: "white", flex: 1 }}
            >
              Edit Role Models
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={buttonStyle}
              startIcon={<AddIcon />}
            >
              Add Role Model
            </Button>
          </Box>
          {/* Role models data display */}
          <Box
            sx={{
              overflowY: "auto", // Enable vertical scrolling if content overflows
              paddingRight: "16px",
              marginBottom: "16px",
              flexGrow: 1,
            }}
          >
            {mockRoleModelData.map((roleModel, index) => (
              <EditModalRoleModels key={index} {...roleModel} />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={buttonStyle}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RoleModelsPage;
