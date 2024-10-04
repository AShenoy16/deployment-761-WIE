// RoleModelModal.tsx
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
import GradientBox from "../GradientBox";

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <GradientBox>
        <DialogContent
          sx={{
            // Gradient from top to bottom
            background: "transparent",
            color: "white", // Ensure text is readable over the gradient
            position: "relative",
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
              color: "white",
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
                <Typography variant="h5" component="h2" sx={{ color: "white" }}>
                  {roleModel.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ color: "white" }}
                >
                  {roleModel.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  marginTop={2}
                  sx={{ color: "white" }}
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
                    sx={{ color: "white" }} // LinkedIn brand color
                  >
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                )}
                {/* Add more social media links as needed */}
              </Box>
            </Box>
          )}
        </DialogContent>
      </GradientBox>
    </Dialog>
  );
};

export default RoleModelModal;
