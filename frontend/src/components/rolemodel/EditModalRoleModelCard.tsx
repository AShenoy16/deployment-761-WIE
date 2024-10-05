import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IRoleModel } from "../../types/RoleModel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDeleteRoleModel } from "../../hooks/useRoleModel";
import { useState } from "react";
import AddUpdateRoleModelModal from "./AddUpdateRoleModelModal";

const EditModalRoleModels: React.FC<IRoleModel> = (roleModel: IRoleModel) => {
  const [addEditFormOpen, setAddEditFormOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const { mutation } = useDeleteRoleModel();

  const handleClickDeleteRoleModel = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const deleteRoleModel = async () => {
    mutation.mutate(roleModel._id);
  };

  const openAddEditModal = () => setAddEditFormOpen(true);

  const handleCloseAddEditModal = () => {
    setAddEditFormOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 3,
        backgroundColor: "#f5f5f5", // Light gray background
        padding: "16px", // Add consistent padding
        borderRadius: "8px", // Softer border radius for a modern feel
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
      }}
    >
      {/* First Row - Action Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "8px",
        }}
      >
        <IconButton
          sx={{ color: "#b92d19" }}
          onClick={handleClickDeleteRoleModel}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={openAddEditModal} sx={{ color: "#6e6e6e" }}>
          <EditNoteIcon />
        </IconButton>
        <AddUpdateRoleModelModal
          open={addEditFormOpen}
          onClose={handleCloseAddEditModal}
          roleModelToEdit={roleModel}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{`Delete role model: ${roleModel.name}?`}</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={deleteRoleModel} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Second Row - Content Section */}
      <Box
        sx={{
          display: "flex",
          paddingX: 2,
        }}
      >
        {/* Left Column - Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "16px",
          }}
        >
          <Avatar
            alt={roleModel.name}
            src={roleModel.photoUrl}
            sx={{ width: 120, height: 120 }} // Slightly smaller avatar for modern look
          />
        </Box>

        {/* Right Column - Details */}
        <Box
          sx={{
            flex: 1,
            color: "#333", // Darker text color for readability
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            {roleModel.name}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            <strong>Title:</strong> {roleModel.title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            <strong>Specialization:</strong> {roleModel.specName}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            <strong>Bio:</strong> {roleModel.bio}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "8px" }}>
            <strong>Description:</strong> {roleModel.description}
          </Typography>

          {/* Social Media Links */}
          {roleModel.socialMediaLinks?.linkedin && (
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}
            >
              <IconButton
                component="a"
                href={roleModel.socialMediaLinks.linkedin}
                target="_blank"
                sx={{ color: "#0072b1" }} // LinkedIn blue color for brand consistency
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditModalRoleModels;
