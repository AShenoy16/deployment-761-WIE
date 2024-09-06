import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { RoleModel } from "../../types/RoleModel";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const EditModalRoleModels: React.FC<RoleModel> = (roleModel: RoleModel) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 5,
        bgcolor: "secondary.main",
        padding: 1,
        borderRadius: 5,
      }}
    >
      {/* First Row Layer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton>
          <CloseIcon />
        </IconButton>
        <IconButton>
          <EditNoteIcon />
        </IconButton>
      </Box>

      {/* Second Row Layer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 3,
          paddingTop: 0,
        }}
      >
        {/* Left Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt={roleModel.name}
            src={roleModel.photoUrl}
            sx={{ width: 200, height: 200 }}
          />
        </Box>

        {/* Right Column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            flex: 1,
            ml: 7,
            color: "white",
          }}
        >
          <Typography variant="h6">{roleModel.name}</Typography>
          <Typography variant="body1">{roleModel.description}</Typography>

          {/* Social Media Links */}
          <Box display="flex" alignItems="center" marginLeft={-1}>
            <IconButton
              component="a"
              href={roleModel.socialMediaLinks.linkedin}
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href={roleModel.socialMediaLinks.instagram}
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditModalRoleModels;
