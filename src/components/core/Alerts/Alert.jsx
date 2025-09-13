// components/core/Alert.jsx
import React from "react";
import { Alert as MuiAlert, IconButton, Collapse, Box } from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const Alert = ({ alert, onClose }) => {
  const getIcon = () => {
    switch (alert.type) {
      case "success":
        return <SuccessIcon />;
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      case "info":
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getSeverity = () => {
    return alert.type || "info";
  };

  return (
    <Collapse in={true}>
      <Box sx={{ mb: 1 }}>
        <MuiAlert
          severity={getSeverity()}
          icon={getIcon()}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => onClose(alert.id)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            boxShadow: 2,
            borderRadius: 1,
            alignItems: "center",
          }}
        >
          {alert.message}
        </MuiAlert>
      </Box>
    </Collapse>
  );
};

export default Alert;
