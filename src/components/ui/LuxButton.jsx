// src/components/ui/LuxButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const LuxButton = styled(Button)(({ theme, variant }) => ({
  ...(variant === "contained" && {
    background: "linear-gradient(45deg, #000000 0%, #333333 100%)",
    border: "none",
    "&:hover": {
      background: "linear-gradient(45deg, #333333 0%, #555555 100%)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
  }),
  ...(variant === "outlined" && {
    border: "2px solid",
    borderColor: "#000000",
    color: "#000000",
    "&:hover": {
      borderColor: "#000000",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      borderWidth: "2px",
    },
  }),
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 4,
  padding: "8px 20px",
  transition: "all 0.2s ease-in-out",
}));

export default LuxButton;
