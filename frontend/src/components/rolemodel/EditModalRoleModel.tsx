import EditModalRoleModels from "./EditModalRoleModelCard";
import AddRoleModelModal from "./AddUpdateRoleModelModal";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IRoleModel } from "../../types/RoleModel";
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
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px", // Softer border radius
  overflow: "hidden", // Handle overflow
};

const buttonStyle = {
  textTransform: "none",
  borderRadius: "8px",
  padding: "0.5rem 1.5rem", // Consistent padding
  fontSize: "1rem", //
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
      <Box sx={modalStyle}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem", // Adjust spacing
          }}
        >
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
            <Typography variant="h5" component="h2" sx={{ color: "black" }}>
              Edit Role Models
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Button to open the form modal */}
            <Button
              variant="contained"
              color="primary"
              onClick={openAddEditModal}
              startIcon={<AddIcon />}
              sx={buttonStyle}
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
            paddingRight: "1rem",
            marginBottom: "1.5rem", // Adjust margin for clarity
            flexGrow: 1,
          }}
        >
          {roleModelsResult &&
            roleModelsResult.map((roleModel) => (
              <EditModalRoleModels key={roleModel._id} {...roleModel} />
            ))}
        </Box>

        {/* Footer Section */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={onClose}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModalRoleModel;
