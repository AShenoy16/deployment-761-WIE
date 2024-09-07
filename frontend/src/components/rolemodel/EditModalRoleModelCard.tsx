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
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDeleteRoleModel } from "../../hooks/useRoleModel";
import { useState } from "react";

const EditModalRoleModels: React.FC<IRoleModel> = (roleModel: IRoleModel) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const deleteRoleModelMutation = useDeleteRoleModel();

  const handleClickDeleteRoleModel = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const deleteRoleModel = async () => {
    (await deleteRoleModelMutation).mutate(roleModel._id);
  };

  return (
    <Box
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
        <IconButton sx={{ color: "red" }} onClick={handleClickDeleteRoleModel}>
          <CloseIcon />
        </IconButton>
        <IconButton sx={{ color: "gray" }}>
          <EditNoteIcon />
        </IconButton>
      </Box>
      {/* Dialog for deleting role model */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{`Delete role model: ${roleModel.name}?`}</DialogTitle>
        <DialogContent>This cannot be undone</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={deleteRoleModel}>Delete</Button>
        </DialogActions>
      </Dialog>

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
            sx={{ width: 150, height: 150 }}
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
            color: "white",
          }}
        >
          <Typography
            variant="body1"
            marginBottom="5px"
          >{`Name: ${roleModel.name}`}</Typography>
          <Typography
            variant="body1"
            marginBottom="5px"
          >{`Title: ${roleModel.title}`}</Typography>
          <Typography
            variant="body1"
            marginBottom="5px"
          >{`Bio: ${roleModel.bio}`}</Typography>
          <Typography
            variant="body1"
            marginBottom="5px"
          >{`Description: ${roleModel.description}`}</Typography>

          {/* Social Media Links */}
          <Box display="flex" alignItems="center" marginLeft={-1}>
            <IconButton
              component="a"
              href={roleModel.socialMediaLinks?.linkedin}
              target="_blank"
              sx={{ color: "white" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditModalRoleModels;
