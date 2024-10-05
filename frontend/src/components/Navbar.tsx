import React, { useState } from "react";
import uoaLogo from "../assets/uoa-logo.png";
import wieLogo from "../assets/whiteWieLogo.svg";
import {
  AppBar,
  Toolbar,
  Box,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar: React.FC = () => {
  // Just using regular react state since a store seems kind of overkill for this one functionality
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const HamburgerList: React.FC = () => (
    <Box
      width={200}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemText sx={{ color: "black" }} primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/role-models">
          <ListItemText sx={{ color: "black" }} primary="Role Models" />
        </ListItem>
        <ListItem component={Link} to="/spec-info">
          <ListItemText sx={{ color: "black" }} primary="Spec Info" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ padding: "0.5rem 2rem" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <MuiLink component={Link} to="/" color="inherit" underline="none">
          <Box
            display="flex"
            alignItems="center"
            component="img"
            src={wieLogo}
            alt="UoA logo"
            sx={{
              height: {
                xs: "2.5rem",
                sm: "3.5rem",
                md: "4.5rem",
              },
            }}
          />
        </MuiLink>
        <Box display={{ xs: "none", md: "flex" }} gap={8}>
          <MuiLink component={Link} to="/" color="inherit" underline="none">
            Home
          </MuiLink>
          <MuiLink
            component={Link}
            to="/role-models"
            color="inherit"
            underline="none"
          >
            Inspiring Leaders
          </MuiLink>
          <MuiLink
            component={Link}
            to="/spec-info"
            color="inherit"
            underline="none"
          >
            Engineering Specialisations
          </MuiLink>
        </Box>
        <Box display={{ xs: "flex", md: "none" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <HamburgerList />
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
