import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { RoleModel } from "../types/RoleModel";

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
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                  bgcolor: "secondary.main",
                  padding: 1,
                  borderRadius: 5,
                }}
              >
                {/* First Row Layer */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                  <IconButton>
                    <EditNoteIcon />
                  </IconButton>
                </Box>

                {/* Second Row Layer */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 3,
                    paddingTop: 0,
                  }}
                >
                  {/* Left Column */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      alt={roleModel.name}
                      src={roleModel.photoUrl}
                      sx={{ width: 200, height: 200 }}
                    />
                  </Box>

                  {/* Right Column */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      flex: 1,
                      ml: 7,
                    }}
                  >
                    <Typography variant="h6">{roleModel.name}</Typography>
                    <Typography variant="body1">
                      {roleModel.description}
                    </Typography>

                    {/* Social Media Links */}
                    <Box display="flex" alignItems="center" marginLeft={-1}>
                      <IconButton
                        component="a"
                        href={roleModel.socialMediaLinks.linkedin}
                        target="_blank"
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={roleModel.socialMediaLinks.instagram}
                        target="_blank"
                      >
                        <InstagramIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
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
