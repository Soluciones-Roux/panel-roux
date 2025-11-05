import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Chip,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { formatPrice } from "../../../utils/formatPrice";
import { useCallback, useState } from "react";
import OrderDetail from "./OrderDetail";
import AddIcon from "@mui/icons-material/Add";

/**
 * Componente reutilizable de listado de pedidos con vista detallada logística.
 */
const OrdersListCore = ({
  title,
  orders,
  color = "primary",
  showTotalKey = "monto",
  isExpress = false,
  isStandar = false,
  setOpenModalCreateOrder,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState({});

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setSelectedPedido({});
  }, [selectedPedido]);
  return (
    <>
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
            </Grid>

            {isStandar && (
              <Grid item>
                <Tooltip
                  title={`Agregar nuevo pedido ${
                    isExpress ? "Express" : "Estándar"
                  }`}
                >
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 500,
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: 2,
                        transform: "scale(1.02)",
                      },
                    }}
                    onClick={() => setOpenModalCreateOrder(true)}
                  >
                    Nuevo {isExpress ? "Express" : "Estándar"}
                  </Button>
                </Tooltip>
              </Grid>
            )}
          </Grid>

          <List>
            {orders?.map((pedido) => {
              return (
                <ListItem
                  key={pedido.id}
                  divider
                  onClick={() => handleOpenModal(pedido)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "grey.50" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `${color}.main` }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <>
                        <Typography>
                          <strong>#{pedido.id}</strong> - {pedido.cliente}
                        </Typography>
                        <Typography variant="body2">
                          Creado por: {pedido.creado_por}
                        </Typography>
                      </>
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
                          ${formatPrice(pedido.total)} • {pedido.fecha}
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
              );
            })}
          </List>
        </CardContent>
      </Card>

      {/* MODAL DETALLE LOGÍSTICO */}

      <OrderDetail
        selectedPedido={selectedPedido}
        openModal={openModal}
        isExpress={isExpress}
        isStandar={isStandar}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

OrdersListCore.propTypes = {
  title: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  color: PropTypes.string,
  showTotalKey: PropTypes.string,
  isExpress: PropTypes.bool,
};

export default OrdersListCore;
