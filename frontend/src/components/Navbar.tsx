import React from "react";
import uoaLogo from "../assets/uoa-logo.png";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ padding: "0.5rem 2rem" }}>
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6" component="div">
            <MuiLink component={Link} to="/" color="inherit" underline="none">
              <Box
                display="flex"
                alignItems="center"
                component="img"
                height="4.5rem"
                src={uoaLogo}
                alt="UoA logo"
              />
            </MuiLink>
          </Typography>
        </Box>
        <Box display="flex" gap={8}>
          <MuiLink component={Link} to="/" color="inherit" underline="none">
            Home
          </MuiLink>
          <MuiLink
            component={Link}
            to="/role-models"
            color="inherit"
            underline="none"
          >
            Role Models
          </MuiLink>
          <MuiLink
            component={Link}
            to="/spec-info"
            color="inherit"
            underline="none"
          >
            Spec Info
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
