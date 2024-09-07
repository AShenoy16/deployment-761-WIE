import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IRoleModel } from "../types/RoleModel";
import EditModalRoleModels from "../components/rolemodel/EditModalRoleModels";
import AddRoleModelModal from "../components/rolemodel/AddRoleModelModal";
import RoleModelModal from "../components/RoleModelModal";
import RoleModelCard from "../components/RoleModelCard";
import { Theme } from "@mui/material";
import { useGetRoleModels } from "../hooks/useRoleModel";

// Define modal styles
const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "800px",
  maxHeight: "90vh",
  background: (theme: Theme) => theme.palette.roleModelBg.main,
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

const RoleModelsPage: React.FC = () => {
  const [selectedRoleModel, setSelectedRoleModel] = useState<IRoleModel | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setEditModal] = useState<boolean>(false);

  const handleEditModalOpen = (): void => setEditModal(true);
  const handleEditModalClose = (): void => setEditModal(false);

  const handleCardClick = (model: IRoleModel) => {
    setSelectedRoleModel(model);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // retrieve role model data
  const { roleModelsResult, isLoading, isError } = useGetRoleModels();
  console.log(roleModelsResult);

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        marginY={4}
        sx={{ color: "#00467F" }}
      >
        Engineering Role Models
      </Typography>

      {/* Edit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEditModalOpen}
          sx={buttonStyle}
        >
          Edit
        </Button>
      </Box>

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleEditModalClose}>
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleEditModalClose}
            >
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography
              variant="h5"
              component="h2"
              sx={{ color: "white", flex: 1 }}
            >
              Edit Role Models
            </Typography>
            <AddRoleModelModal />
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
              roleModelsResult.map((roleModel, index) => (
                <EditModalRoleModels key={index} {...roleModel} />
              ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditModalClose}
              sx={buttonStyle}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Column layout for the role model cards */}
      <Box display="flex" flexDirection="column" gap={3} marginBottom={5}>
        {roleModelsResult.map((model) => (
          <RoleModelCard
            key={model._id}
            model={model}
            onClick={handleCardClick}
          />
        ))}
      </Box>

      {/* Modal component */}
      <RoleModelModal
        open={openModal}
        onClose={handleCloseModal}
        roleModel={selectedRoleModel}
      />
    </Container>
  );
};

export default RoleModelsPage;
