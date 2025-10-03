// src/components/core/Header.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const Header = ({ onMenuToggle }) => {
  const { user, logout } = authStore;
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    handleMenuClose();
  };

  const handleLogoutConfirm = async () => {
    setLogoutDialogOpen(false);
    await logout();
    // La redirección se maneja dentro del store
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile"); // Redirigir a perfil
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    navigate("/settings"); // Redirigir a configuración
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={2}
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          backgroundImage: "none",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
            color={"secondary.main"}
          >
            {user.name_company}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Notificaciones */}
          <Tooltip title="Notificaciones">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Perfil de usuario */}
          <Tooltip title="Cuenta">
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{ ml: 1 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "secondary.main",
                  color: "secondary.contrastText",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {user?.username?.charAt(0) || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Menú de usuario */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                width: 240,
                mt: 1.5,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                border: "1px solid",
                borderColor: "divider",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  {user?.name || "Usuario"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email || "usuario@empresa.com"}
                </Typography>
                <Typography
                  variant="caption"
                  color="secondary.main"
                  sx={{ mt: 0.5 }}
                >
                  {user?.role || "Usuario"}
                </Typography>
              </Box>
            </MenuItem>
            <Divider sx={{ my: 1 }} />

            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <PersonIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <Typography variant="body2">Mi Perfil</Typography>
            </MenuItem>

            <MenuItem onClick={handleSettingsClick}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <Typography variant="body2">Configuración</Typography>
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2" color="error.main">
                Cerrar Sesión
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Diálogo de confirmación de logout */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">Cerrar Sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cerrar tu sesión? Tendrás que iniciar
            sesión nuevamente para acceder al sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            color="error"
            autoFocus
            variant="contained"
          >
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
