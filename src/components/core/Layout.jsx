// src/components/core/Layout.jsx
import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F8F9FA", // Fondo similar a Lux
      }}
    >
      <Header onMenuToggle={handleMenuToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#F8F9FA",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
