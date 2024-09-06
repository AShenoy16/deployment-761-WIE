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
import { RoleModel } from "../pages/RoleModelsPage";

interface RoleModelModalProps {
  open: boolean;
  onClose: () => void;
  roleModel: RoleModel | null;
}

const RoleModelModal: React.FC<RoleModelModalProps> = ({
  open,
  onClose,
  roleModel,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
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
              <Typography variant="h5" component="h2">
                {roleModel.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {roleModel.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" marginTop={2}>
                {roleModel.bio}
              </Typography>
            </Box>

            {/* Social media links at the bottom */}
            <Box marginTop={4}>
              {roleModel.socialMediaLinks?.linkedin && (
                <IconButton
                  component="a"
                  href={roleModel.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#0077b5" }} // LinkedIn brand color
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
