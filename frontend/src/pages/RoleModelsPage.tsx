import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleModelModal from "../components/RoleModelModal";
import RoleModelCard from "../components/RoleModelCard";
export interface SocialMediaLinks {
  linkedin?: string;
}

export interface RoleModel {
  id: number;
  name: string;
  title: string;
  description: string;
  photoUrl: string;
  bio?: string;
  socialMediaLinks?: SocialMediaLinks;
}

const roleModels: RoleModel[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
