import React, { useEffect, useState } from "react";
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
import { IRoleModel } from "../../types/RoleModel";
import { useAddRoleModel, usePutRoleModel } from "../../hooks/useRoleModel";

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

export type addUpdateRoleModelType = Omit<IRoleModel, "_id">;

interface RoleModelModalProps {
  open: boolean;
  onClose: () => void;
  roleModelToEdit?: IRoleModel | null; // Optional prop for editing
}

const AddUpdateRoleModelModal: React.FC<RoleModelModalProps> = ({
  open,
  onClose,
  roleModelToEdit = null, // Default to null for adding
}) => {
  const addRoleModelMutation = useAddRoleModel();
  const putRoleModelMutation = usePutRoleModel();

  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [specName, setSpecName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Pre-fill form if editing
    if (roleModelToEdit) {
      setPhoto(roleModelToEdit.photoUrl);
      setName(roleModelToEdit.name);
      setTitle(roleModelToEdit.title);
      setSpecName(roleModelToEdit.specName);
      setDescription(roleModelToEdit.description);
      setBio(roleModelToEdit.bio);
      setLinkedin(roleModelToEdit.socialMediaLinks?.linkedin || "");
    }
  }, [roleModelToEdit]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file); // Convert image to base64 string
    } else {
      setError("Please upload a valid image.");
    }
  };

  const handleSubmit = async () => {
    // validate fields
    if (!name || !title || !bio || !description || !photo) {
      setError("All fields* are required, including the image.");
      return;
    }

    // Construct the role model object
    const newRoleModel: addUpdateRoleModelType = {
      name,
      title,
      specName,
      description,
      bio,
      photoUrl: photo as string, // Store the base64 or upload to server
      socialMediaLinks: { linkedin },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      setError(undefined);
      roleModelToEdit
        ? putRoleModelMutation.mutate({
            roleModel: newRoleModel,
            roleModelId: roleModelToEdit._id,
          })
        : addRoleModelMutation.mutate(newRoleModel);
      onClose();
    } catch (error) {
      console.error("Error adding role model:", error);
      setError("Unexpected error adding role model. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="form-modal-title"
      aria-describedby="form-modal-description"
    >
      <Box sx={modalStyle}>
        {/* First Layer: Header with Back Button and Title */}
        <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            {roleModelToEdit ? "Edit Role Model" : "Add Role Model"}
          </Typography>
        </Box>

        {/* Error message */}
        {error && (
          <Typography color="error" sx={{}}>
            {error}
          </Typography>
        )}

        {/* Second Layer: Content with Two Columns */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "scroll",
          }}
        >
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
              mx: 3,
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              fullWidth
              required
              sx={{ mt: 2 }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              fullWidth
              required
              sx={{ mt: 2 }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Specialisation"
              variant="outlined"
              value={specName}
              fullWidth
              required
              sx={{ mt: 2 }}
              onChange={(e) => setSpecName(e.target.value)}
            />
            <TextField
              label="Bio"
              variant="outlined"
              value={bio}
              fullWidth
              required
              sx={{ mt: 2 }}
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
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
              value={linkedin}
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
            onClick={onClose}
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
            {roleModelToEdit ? "Save Changes" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUpdateRoleModelModal;
