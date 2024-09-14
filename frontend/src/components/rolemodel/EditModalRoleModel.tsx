import EditModalRoleModels from "./EditModalRoleModelCard";
import AddRoleModelModal from "./AddUpdateRoleModelModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IRoleModel } from "../../types/RoleModel";
import GradientBox from "../GradientBox";
import { useState } from "react";

// Define modal styles
const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "800px",
  maxHeight: "90vh",
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

interface EditModalRoleModelProps {
  open: boolean;
  onClose: () => void;
  roleModelsResult: IRoleModel[] | null;
}

const EditModalRoleModel: React.FC<EditModalRoleModelProps> = ({
  open,
  onClose,
  roleModelsResult,
}) => {
  const [addEditFormOpen, setAddEditFormOpen] = useState<boolean>(false);

  const openAddEditModal = () => setAddEditFormOpen(true);

  const handleCloseAddEditModal = () => {
    setAddEditFormOpen(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <GradientBox sx={modalStyle}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "white", flex: 1 }}
          >
            Edit Role Models
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Button to open the form modal */}
            <Button
              variant="contained"
              color="primary"
              onClick={openAddEditModal}
              startIcon={<AddIcon />}
              sx={{
                textTransform: "none",
                textDecorationLine: "underline",
                borderRadius: "12px",
              }}
            >
              Add New Role Model
            </Button>
            <AddRoleModelModal
              open={addEditFormOpen}
              onClose={handleCloseAddEditModal}
            />
          </Box>
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
          {roleModelsResult &&
            roleModelsResult.map((roleModel) => (
              <EditModalRoleModels key={roleModel._id} {...roleModel} />
            ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={buttonStyle}
          >
            Save Changes
          </Button>
        </Box>
      </GradientBox>
    </Modal>
  );
};

export default EditModalRoleModel;
