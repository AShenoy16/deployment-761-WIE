import React, { useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { IRoleModel } from "../types/RoleModel";
import RoleModelModal from "../components/rolemodel/RoleModelModal";
import RoleModelCard from "../components/rolemodel/RoleModelCard";
import { useGetRoleModels } from "../hooks/useRoleModel";
import EditModalRoleModel from "../components/rolemodel/EditModalRoleModel";
import { useAuthStore } from "../stores/AuthenticationStore";
import Snackbar from "@mui/material/Snackbar";
import { useSnackbarStore } from "../stores/SnackBarStore";

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
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const message = useSnackbarStore((state) => state.message);
  const isOpen = useSnackbarStore((state) => state.isOpen);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);

  const handleEditModalOpen = (): void => setEditModal(true);
  const handleEditModalClose = (): void => setEditModal(false);
  const handleSnackBarClose = (): void => setIsOpen(false);

  const handleCardClick = (model: IRoleModel) => {
    setSelectedRoleModel(model);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // retrieve role model data
  const { roleModelsResult, isLoading, isError } = useGetRoleModels();

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
      {isAdminLoggedIn && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEditModalOpen}
            sx={buttonStyle}
          >
            Edit
          </Button>
        </Box>
      )}

      {/* Edit Modal */}
      <EditModalRoleModel
        open={openEditModal}
        onClose={handleEditModalClose}
        roleModelsResult={roleModelsResult}
      />

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

      {/* Snack Bar */}
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
        message={message}
      />
    </Container>
  );
};

export default RoleModelsPage;
