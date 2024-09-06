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
import { useNavigate } from "react-router-dom";
import RoleModelModal from "../components/RoleModelModal";
import RoleModelCard from "../components/RoleModelCard";

// Define modal styles
const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "800px",
  maxHeight: "90vh",
  bgcolor: "#009AC7", //TODO: needs linear background
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

const mockRoleModels: IRoleModel[] = [
  {
    _id: 1,
    name: "Alyssa Morris",
    title: "Product Manager, Intel",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://www.womeninscience.africa/wp-content/uploads/2022/11/Unsung-Black-Female-Engineers.jpg", // updated to photoUrl
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/alyssamorris", // moved inside socialMediaLinks
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 2,
    name: "Samantha Smith",
    title: "Software Engineer, Google",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://nzmanufacturer.co.nz/wp-content/uploads/2023/08/Women-In-Engineering-PIC.jpg", // updated to photoUrl
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/samanthasmith",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const RoleModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoleModel, setSelectedRoleModel] = useState<IRoleModel | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setEditModal] = useState<boolean>(false);

  const handleOpen = (): void => setEditModal(true);
  const handleClose = (): void => setEditModal(false);

  const handleCardClick = (model: IRoleModel) => {
    setSelectedRoleModel(model);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          onClick={handleOpen}
          sx={buttonStyle}
        >
          Edit
        </Button>
      </Box>

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleClose}>
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
            {mockRoleModels.map((roleModel, index) => (
              <EditModalRoleModels key={index} {...roleModel} />
            ))}
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

      {/* Column layout for the role model cards */}
      <Box display="flex" flexDirection="column" gap={3}>
        {mockRoleModels.map((model) => (
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
