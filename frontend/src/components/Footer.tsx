import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import wenLogo from "../assets/img-white-wie-logo.svg";
import { useAuthStore } from "../stores/AuthenticationStore";

const Footer: React.FC = () => {
  const theme = useTheme();
  const { isLoggedIn } = useAuthStore();

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }} // Make it responsive
      justifyContent="space-between"
      alignItems="center"
      padding="0.5rem 1.5rem"
      borderTop="1px solid #ddd"
      bgcolor={theme.palette.primary.main}
    >
      <Box display="flex" alignItems="center" mb={{ xs: 2, md: 0 }}>
        <Box
          borderRadius="1rem"
          display="flex"
          alignItems="center"
          component="img"
          height="4rem"
          src={wenLogo}
          alt="WEN logo"
          mr={{ xs: 2, md: 3 }} // Responsive margin for spacing
        />
        <Typography variant="body1" color="white">
          Contact us:
        </Typography>
        <Box display="flex" ml={1}>
          <IconButton
            component={MuiLink}
            href="https://www.instagram.com/wenforschools/?hl=en"
            target="_blank"
            sx={{ color: "white" }}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            component={MuiLink}
            href="mailto:wie@auckland.ac.nz"
            target="_blank"
            sx={{ color: "white" }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            component={MuiLink}
            href="https://womeninengineering.auckland.ac.nz/"
            target="_blank"
            sx={{ color: "white" }}
          >
            <LanguageIcon />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <MuiLink component={Link} to="/login">
          {isLoggedIn ? (
            <Typography variant="body1" color="white">
              Logout
            </Typography>
          ) : (
            <Typography variant="body1" color="white">
              Staff Login
            </Typography>
          )}
        </MuiLink>
      </Box>
    </Box>
  );
};

export default Footer;
