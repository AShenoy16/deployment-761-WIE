import React, { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

const RoleModelsPage: React.FC = () => {
  // Define modal styles
  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    bgcolor: "secondary.main",
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle = {
    textTransform: "none",
    textDecorationLine: "underline",
    borderRadius: "12px",
  };

  // useState type definition for boolean state
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
