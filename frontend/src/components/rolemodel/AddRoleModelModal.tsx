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
import AddIcon from "@mui/icons-material/Add";
import { IRoleModel } from "../../types/RoleModel";
import { useAddRoleModel } from "../../hooks/useRoleModel";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "750px",
  maxHeight: "80vh",
  background: "#fff",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  borderRadius: 5,
};

const buttonStyle = {
  textTransform: "none",
  borderRadius: "12px",
};

export type addRoleModelType = Omit<IRoleModel, "_id">

const AddRoleModelModal: React.FC = () => {
  const addRoleModelMutation = useAddRoleModel();

  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");

  const handleFormOpen = (): void => setFormOpen(true);
  const handleFormClose = (): void => setFormOpen(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    }
  };

  const handleSubmit = async () => {
    // Construct the role model object
    const newRoleModel: addRoleModelType = {
      name,
      title,
      description,
      bio,
      photoUrl: photo as string, // Store the base64 or upload to server
      socialMediaLinks: { linkedin },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      addRoleModelMutation.mutate(newRoleModel);
    } catch (error) {
      console.error("Error adding role model:", error);
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
          <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
            <IconButton onClick={handleFormClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">Add Role Model</Typography>
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
                src={photo ? (photo as string) : undefined}
                sx={{ width: 120, height: 120 }}
              />
              <Button
                variant="contained"
                component="label"
                color="secondary"
                sx={buttonStyle}
              >
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
                ml: 5,
              }}
            >
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 2 }}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 2 }}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Bio"
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 2 }}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                sx={{ mt: 2 }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="LinkedIn URL"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </Box>
          </Box>

          {/* Bottom Section: Buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormClose}
              sx={buttonStyle}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={buttonStyle}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddRoleModelModal;
