import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleModelModal from "../components/RoleModelModal";
import RoleModelCard from "../components/RoleModelCard";

// Example role models data
interface RoleModel {
  id: number;
  name: string;
  title: string;
  info: string;
  image: string;
  bio?: string; // Add more information if necessary
  linkedin?: string; // LinkedIn profile link
}

const roleModels: RoleModel[] = [
  {
    id: 1,
    name: "Alyssa Morris",
    title: "Product Manager, Intel",
    info: "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    image:
      "https://www.womeninscience.africa/wp-content/uploads/2022/11/Unsung-Black-Female-Engineers.jpg",
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    linkedin: "https://www.linkedin.com/in/alyssamorris",
  },
  {
    id: 2,
    name: "Samantha Smith",
    title: "Software Engineer, Google",
    info: "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    image:
      "https://nzmanufacturer.co.nz/wp-content/uploads/2023/08/Women-In-Engineering-PIC.jpg",
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    linkedin: "https://www.linkedin.com/in/alyssamorris",
  },
];

const RoleModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoleModel, setSelectedRoleModel] = useState<RoleModel | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  const handleCardClick = (model: RoleModel) => {
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

      {/* Column layout for the role model cards */}
      <Box display="flex" flexDirection="column" gap={3}>
        {roleModels.map((model) => (
          <RoleModelCard
            key={model.id}
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
