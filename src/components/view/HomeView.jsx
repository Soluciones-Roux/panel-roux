import PropTypes from "prop-types";

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
  LinearProgress,
} from "@mui/material";

import {
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  OnlinePrediction as OnlineIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import OrdersListCore from "../core/Orders/OrdersListCore";
import UserLocationModal from "../core/UserLocationModal";
import CreateOrderStandarCard from "../core/Orders/CreateNewOrderStandar";
import DateRangeFilter from "../core/DateRangeFilter";

const HomeView = ({
  userName,
  companyName,
  stats,
  vendedoresOnline,
  estadosPedidos,
  pedidosEstandar,
  pedidosExpress,
  sellersCompany,
  handleUserLocation,
  openModalLocation,
  setOpenModalLocation,
  loading,
  locationUser,
  openModalCreateOrder,
  setOpenModalCreateOrder,
  dateFilter,
  onFilterApply,
  onFilterClear,
}) => {
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

      {/* Filtro de fechas */}
      <DateRangeFilter
        onFilterApply={onFilterApply}
        onFilterClear={onFilterClear}
      />

      <Grid container spacing={3}>
        {/* Tarjeta de ventas del día */}
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ bgcolor: "success.main", mx: "auto", mb: 2 }}>
                <MoneyIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                ${stats?.totalVendidoHoy?.toLocaleString()}
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
                {/* ajuste total vendedores companies, y omitir 5 */}
                {vendedoresOnline.length}/{sellersCompany?.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vendedores en línea
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(vendedoresOnline.length / sellersCompany?.length) * 100}
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
                {stats?.pedidosHoy}
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
                {stats?.pedidosPendientes}
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
                Vendedores en Línea ({vendedoresOnline?.length})
              </Typography>

              <List>
                {vendedoresOnline?.map((vendedor) => (
                  <ListItem key={vendedor?.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={vendedor?.nombre}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Última conexión: {vendedor?.ultimaConexion}
                          </Typography>
                          <Typography variant="body2">
                            Ventas: ${vendedor?.ventasHoy.toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            Pedidos: {vendedor?.pedidos}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#007bff",
                              cursor: "pointer",
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                            }}
                            onClick={() => handleUserLocation(vendedor)}
                          >
                            Ver ubicaciones
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

          <Grid item xs={12} md={12}>
            <OrdersListCore
              title="Lista de pedidos Estándar"
              orders={pedidosEstandar}
              color="secondary"
              showTotalKey="monto"
              isStandar={true}
              setOpenModalCreateOrder={setOpenModalCreateOrder}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <OrdersListCore
              title="Lista de pedidos Express"
              orders={pedidosExpress}
              color="info"
              showTotalKey="total"
              isExpress={true}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <UserLocationModal
          openModal={openModalLocation}
          onCloseModal={setOpenModalLocation}
          loading={loading}
          locationUser={locationUser}
        />
      </Grid>

      <Grid>
        <CreateOrderStandarCard openModal={openModalCreateOrder} setOpenModal={setOpenModalCreateOrder} />
      </Grid>
    </Container>
  );
};

HomeView.propTypes = {
  userName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,

  stats: PropTypes.shape({
    totalVendidoHoy: PropTypes.number,
    pedidosHoy: PropTypes.number,
    pedidosPendientes: PropTypes.number,
  }).isRequired,

  vendedoresOnline: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      nombre: PropTypes.string,
      ultimaConexion: PropTypes.string,
      ventasHoy: PropTypes.number,
      pedidos: PropTypes.number,
    })
  ).isRequired,

  sellersCompany: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      nombre: PropTypes.string,
    })
  ),

  estadosPedidos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      estado: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
      color: PropTypes.string,
      icon: PropTypes.node,
    })
  ).isRequired,

  pedidosEstandar: PropTypes.array,
  pedidosExpress: PropTypes.array,

  handleUserLocation: PropTypes.func.isRequired,
  openModalLocation: PropTypes.bool.isRequired,
  setOpenModalLocation: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  locationUser: PropTypes.array,
  openModalCreateOrder: PropTypes.bool,
  setOpenModalCreateOrder: PropTypes.func,
  
  dateFilter: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
};

export default HomeView;
