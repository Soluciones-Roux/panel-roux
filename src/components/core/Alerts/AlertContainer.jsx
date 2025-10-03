// components/core/AlertContainer.jsx
import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite"; // ¡IMPORTANTE!
import Alert from "./Alert";
import { alertStore } from "../../store/useAlertStore";

const AlertContainer = observer(() => {
  // ¡Wrapper observer!
  // Acceder a las propiedades del store de MobX
  const { alerts, removeAlert } = alertStore;

  // Posición fija en la parte superior derecha
  return (
    <Box
      sx={{
        position: "fixed",
        top: 80,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
        width: "100%",
      }}
    >
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          alert={alert}
          onClose={() => removeAlert(alert.id)} // ¡Pasar el id!
        />
      ))}
    </Box>
  );
});

export default AlertContainer;
