import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "600px" },
  maxWidth: "600px",
  maxHeight: "90vh",
  background: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const AddRoleModelModal: React.FC = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFormOpen = (): void => setFormOpen(true);
  const handleFormClose = (): void => setFormOpen(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {/* Button to open the form modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleFormOpen}
        startIcon={<AddIcon />}
        sx={{
          textTransform: "none",
          textDecorationLine: "underline",
          borderRadius: "12px",
        }}
      >
        Add New Role Model
      </Button>

      {/* Form Modal */}
      <Modal
        open={formOpen}
        onClose={handleFormClose}
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
      >
        <Box sx={modalStyle}>
          {/* First Layer: Header with Back Button and Title */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Add Role Model</Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Second Layer: Content with Two Columns */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Column: Image Upload */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Avatar
                src={imagePreview ? (imagePreview as string) : undefined}
                sx={{ width: 120, height: 120 }}
              />
              <Button variant="contained" component="label" color="secondary">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>

            {/* Right Column: Role Model Attributes */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                ml: 2,
              }}
            >
              <TextField label="Name" variant="outlined" fullWidth required />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                sx={{ mt: 2 }}
              />
              <TextField
                label="LinkedIn URL"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <TextField
                label="Instagram URL"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Box>
          </Box>

          {/* Bottom Section: Buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormClose}
            >
              Cancel
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddRoleModelModal;
