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
import CloseIcon from "@mui/icons-material/Close"; // For closing the modal
import LinkedInIcon from "@mui/icons-material/LinkedIn"; // LinkedIn social media icon

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
  },
];

const RoleModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          <Card
            key={model.id}
            sx={{
              display: "flex",
              borderRadius: 4,
              alignItems: "center",
              flexDirection: isSmallScreen ? "column" : "row", // Switch layout based on screen size
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row", // Image above text on small screens
                alignItems: "center",
              }}
              onClick={() => handleCardClick(model)}
            >
              {/* Image */}
              <CardMedia
                component="img"
                sx={{
                  width: 150, // Adjust width as needed
                  height: 150, // Adjust height as needed
                  borderRadius: "50%",
                  objectFit: "cover", // Ensures image fits nicely
                  margin: 2, // Spacing around the image
                }}
                image={model.image}
                alt={model.name}
              />

              {/* Text content */}
              <CardContent
                sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
              >
                <Typography variant="h6" component="div">
                  {model.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {model.info}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {model.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Modal for role model details */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md" // Make the modal large
      >
        <DialogContent>
          {/* Close button */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedRoleModel && (
            <Box textAlign="center">
              {/* Image at the top */}
              <CardMedia
                component="img"
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto", // Center the image
                }}
                image={selectedRoleModel.image}
                alt={selectedRoleModel.name}
              />

              {/* Text content below */}
              <Box marginTop={3}>
                <Typography variant="h5" component="h2">
                  {selectedRoleModel.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {selectedRoleModel.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" marginTop={2}>
                  {selectedRoleModel.bio}
                </Typography>
              </Box>

              {/* Social media links at the bottom */}
              <Box marginTop={4}>
                {selectedRoleModel.linkedin && (
                  <IconButton
                    component="a"
                    href={selectedRoleModel.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#0077b5" }} // LinkedIn brand color
                  >
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                )}
                {/* Add more social media links (e.g., Twitter, GitHub) as needed */}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default RoleModelsPage;
