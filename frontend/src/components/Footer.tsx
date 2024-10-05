import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  IconButton,
  useTheme,
  SvgIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import wenLogo from "../assets/whiteWieLogo.svg";
import { useAuthStore } from "../stores/AuthenticationStore";

// MUI doesn't have its own tiktok icon
const TikTokIcon = () => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="100%"
      height="2rem"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </SvgIcon>
  );
};

// TODO: Edit links later
const Footer: React.FC = () => {
  const theme = useTheme();
  const { isLoggedIn } = useAuthStore();

  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      justifyContent="space-between"
      alignItems="center"
      padding="0.5rem 3.5rem"
      borderTop="1px solid #ddd"
      bgcolor={theme.palette.primary.main}
    >
      <Box display="flex" alignItems="center">
        <Box
          borderRadius="1rem"
          display="flex"
          alignItems="center"
          component="img"
          height="4rem"
          src={wenLogo}
          alt="WEN logo"
          mr={3}
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
