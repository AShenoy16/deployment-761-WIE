import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IRoleModel } from "../../types/RoleModel";

interface RoleModelModalProps {
  open: boolean;
  onClose: () => void;
  roleModel: IRoleModel | null;
}

const RoleModelModal: React.FC<RoleModelModalProps> = ({
  open,
  onClose,
  roleModel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow for modern feel
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "white", // White background for clean look
          color: "black", // Ensure text is readable
          position: "relative",
          padding: "2rem", // Add padding for spacing
        }}
      >
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "gray", // Light gray color for contrast
          }}
        >
          <CloseIcon />
        </IconButton>

        {roleModel && (
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
              image={roleModel.photoUrl}
              alt={roleModel.name}
            />

            {/* Text content below */}
            <Box marginTop={3}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: "primary.main" }} // Purple color for the name
              >
                {roleModel.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "black", marginTop: 1 }} // Black for title
              >
                {roleModel.title}
              </Typography>
              <Typography
                variant="body1"
                marginTop={2}
                sx={{ color: "black" }} // Black for bio
              >
                {roleModel.bio}
              </Typography>
            </Box>

            {/* Social media links at the bottom */}
            <Box marginTop={4}>
              {roleModel.socialMediaLinks?.linkedin && (
                <IconButton
                  role="link"
                  component="a"
                  href={roleModel.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#0A66C2" }} // LinkedIn brand color
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              )}
              {/* Add more social media links as needed */}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoleModelModal;
