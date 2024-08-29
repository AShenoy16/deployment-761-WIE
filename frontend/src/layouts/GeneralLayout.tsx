import React from "react";
import { Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type GeneralLayoutProps = {
  children: React.ReactNode;
};

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <Stack minHeight="100vh">
      <Navbar />
      <Stack flex="1">{children}</Stack>
      <Footer />
    </Stack>
  );
};

export default GeneralLayout;
