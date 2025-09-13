// hooks/useAlert.js - PARA MOBX
import { useEffect } from "react";
import { alertStore } from "../stores/AlertStore";

export const useAlert = () => {
  // Si necesitas reaccionar a cambios en las alertas:
  useEffect(() => {
    // Aquí podrías suscribirte a cambios si fuera necesario
    return () => {
      // Cleanup si es necesario
    };
  }, []);

  return {
    success: alertStore.success.bind(alertStore),
    error: alertStore.error.bind(alertStore),
    warning: alertStore.warning.bind(alertStore),
    info: alertStore.info.bind(alertStore),
    removeAlert: alertStore.removeAlert.bind(alertStore),
    clearAlerts: alertStore.clearAlerts?.bind(alertStore), // Si implementas clearAlerts
  };
};

// En cualquier página o componente - ejemplo de uso:
// import React from "react";
// import { Button, Box } from "@mui/material";
// import { useAlert } from "../hooks/useAlert";

// const MyComponent = () => {
//   const alert = useAlert();

//   const handleSuccess = () => {
//     alert.success("¡Proceso completado con éxito!");
//   };

//   const handleError = () => {
//     alert.error("¡Algo salió mal! Por favor intenta nuevamente.");
//   };

//   const handleWarning = () => {
//     alert.warning("Esta acción no se puede deshacer.", {
//       duration: 8000, // Duración personalizada
//     });
//   };

//   const handleInfo = () => {
//     alert.info("Actualizando información...", {
//       autoHide: false, // No se auto-oculta
//     });
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Button
//         variant="contained"
//         color="success"
//         onClick={handleSuccess}
//         sx={{ m: 1 }}
//       >
//         Éxito
//       </Button>
//       <Button
//         variant="contained"
//         color="error"
//         onClick={handleError}
//         sx={{ m: 1 }}
//       >
//         Error
//       </Button>
//       <Button
//         variant="contained"
//         color="warning"
//         onClick={handleWarning}
//         sx={{ m: 1 }}
//       >
//         Advertencia
//       </Button>
//       <Button
//         variant="contained"
//         color="info"
//         onClick={handleInfo}
//         sx={{ m: 1 }}
//       >
//         Información
//       </Button>
//     </Box>
//   );
// };

// export default MyComponent;
