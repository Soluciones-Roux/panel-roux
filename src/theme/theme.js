// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const luxTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000", // Negro intenso de Lux
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#BF9B30", // Dorado/ámbar de Lux
      light: "#D4B44F",
      dark: "#A58221",
      contrastText: "#000000",
    },
    background: {
      default: "#FFFFFF", // Fondo blanco puro
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000", // Texto negro
      secondary: "#666666", // Texto gris
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    success: {
      main: "#28a745", // Verde de Bootstrap
      contrastText: "#fff",
    },
    warning: {
      main: "#ffc107", // Ámbar de Bootstrap
      contrastText: "#000",
    },
    error: {
      main: "#dc3545", // Rojo de Bootstrap
      contrastText: "#fff",
    },
    info: {
      main: "#17a2b8", // Azul turquesa de Bootstrap
      contrastText: "#fff",
    },
    divider: "#EEEEEE",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#000000",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#000000",
      letterSpacing: "-0.5px",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      color: "#000000",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#000000",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      color: "#000000",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1rem",
      color: "#000000",
    },
    subtitle1: {
      color: "#666666",
      fontWeight: 500,
    },
    subtitle2: {
      color: "#666666",
      fontWeight: 400,
    },
    body1: {
      color: "#000000",
      lineHeight: 1.6,
    },
    body2: {
      color: "#666666",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.5px",
    },
    caption: {
      color: "#666666",
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    "0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1)",
    "0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.08)",
    "0 19px 38px rgba(0,0,0,0.12), 0 15px 12px rgba(0,0,0,0.05)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "8px 20px",
          fontWeight: 600,
          transition: "all 0.2s ease-in-out",
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "none",
          borderRadius: 8,
          overflow: "hidden",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        elevation1: {
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        },
        elevation2: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        elevation3: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: "#FAFAFA",
          color: "#000000",
          borderBottom: "2px solid #EEEEEE",
        },
        body: {
          borderBottom: "1px solid #EEEEEE",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#666666",
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000000",
            borderWidth: "2px",
          },
        },
        notchedOutline: {
          borderColor: "#E0E0E0",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#EEEEEE",
        },
      },
    },
  },
});

export default luxTheme;
