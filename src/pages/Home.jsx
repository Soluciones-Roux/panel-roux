import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  OnlinePrediction as OnlineIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  LocalShipping as ShippingIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const Home = () => {
  // Datos dummy para el sistema de pedidos
  const companyName = "Distribuciones Modernas S.A.";
  const userName = "Carlos Rodríguez";

  // Estadísticas principales
  const stats = {
    totalVendidoHoy: 12540.75,
    vendedoresOnline: 8,
    totalVendedores: 15,
    pedidosHoy: 23,
    pedidosPendientes: 7,
    pedidosCompletados: 16,
  };

  // Estados de pedidos
  const estadosPedidos = [
    {
      id: 1,
      estado: "Completado",
      cantidad: stats.pedidosCompletados,
      color: "success",
      icon: <CheckCircleIcon />,
    },
    {
      id: 2,
      estado: "Pendiente",
      cantidad: stats.pedidosPendientes,
      color: "warning",
      icon: <PendingIcon />,
    },
    {
      id: 3,
      estado: "En camino",
      cantidad: 5,
      color: "info",
      icon: <ShippingIcon />,
    },
    {
      id: 4,
      estado: "Cancelado",
      cantidad: 2,
      color: "error",
      icon: <CancelIcon />,
    },
  ];

  // Pedidos recientes
  const pedidosRecientes = [
    {
      id: 1001,
      cliente: "Supermercado Central",
      monto: 1250.5,
      estado: "Completado",
      hora: "10:30 AM",
    },
    {
      id: 1002,
      cliente: "Tienda Don José",
      monto: 845.25,
      estado: "Pendiente",
      hora: "11:15 AM",
    },
    {
      id: 1003,
      cliente: "Minimarket La Esquina",
      monto: 1560.0,
      estado: "En camino",
      hora: "9:45 AM",
    },
    {
      id: 1004,
      cliente: "Abastos Hernández",
      monto: 920.3,
      estado: "Completado",
      hora: "8:20 AM",
    },
  ];

  // Vendedores en línea
  const vendedoresOnline = [
    { id: 1, nombre: "María González", ventasHoy: 3250.0, pedidos: 5 },
    { id: 2, nombre: "Roberto Sánchez", ventasHoy: 2850.75, pedidos: 4 },
    { id: 3, nombre: "Laura Mendoza", ventasHoy: 2100.5, pedidos: 3 },
    { id: 4, nombre: "Javier López", ventasHoy: 1850.25, pedidos: 3 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header de bienvenida */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido, {userName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {companyName} - Panel de control
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Resumen de actividades del día
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Tarjeta de ventas del día */}
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "success.main", mx: "auto", mb: 2 }}>
                <MoneyIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                ${stats.totalVendidoHoy.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total vendido hoy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta de vendedores online */}
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "info.main", mx: "auto", mb: 2 }}>
                <OnlineIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {stats.vendedoresOnline}/{stats.totalVendedores}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vendedores en línea
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(stats.vendedoresOnline / stats.totalVendedores) * 100}
                sx={{ mt: -0.5 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta de pedidos hoy */}
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                <AssignmentIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {stats.pedidosHoy}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pedidos hoy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta de pedidos pendientes */}
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "warning.main", mx: "auto", mb: 2 }}>
                <PendingIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {stats.pedidosPendientes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta de vendedores en línea */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <OnlineIcon sx={{ mr: 1 }} />
                Vendedores en Línea ({stats.vendedoresOnline})
              </Typography>

              <List>
                {vendedoresOnline.map((vendedor) => (
                  <ListItem key={vendedor.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={vendedor.nombre}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Ventas: ${vendedor.ventasHoy.toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            Pedidos: {vendedor.pedidos}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} container spacing={3}>
          {/* Tarjeta de estados de pedidos */}
          <Grid item xs={12} md={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estados de Pedidos
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {estadosPedidos.map((estado) => (
                    <Grid item xs={12} sm={6} key={estado.id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 2,
                          border: 1,
                          borderColor: "grey.200",
                          borderRadius: 1,
                        }}
                      >
                        <Avatar sx={{ bgcolor: `${estado.color}.main`, mr: 2 }}>
                          {estado.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">
                            {estado.cantidad}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {estado.estado}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Tarjeta de pedidos recientes */}
          <Grid item xs={12} md={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pedidos Recientes
                </Typography>

                <List>
                  {pedidosRecientes.map((pedido) => (
                    <ListItem key={pedido.id} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                          <AssignmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography>
                            <strong>#{pedido.id}</strong> - {pedido.cliente}
                          </Typography>
                        }
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography variant="body2">
                              ${pedido.monto.toLocaleString()} • {pedido.hora}
                            </Typography>
                            <Chip
                              label={pedido.estado}
                              size="small"
                              color={
                                pedido.estado === "Completado"
                                  ? "success"
                                  : pedido.estado === "Pendiente"
                                  ? "warning"
                                  : pedido.estado === "En camino"
                                  ? "info"
                                  : "error"
                              }
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
