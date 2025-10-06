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
  Modal,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { formatPrice } from "../../../utils/formatPrice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrder";
import OrderDetail from "./OrderDetail";

/**
 * Componente reutilizable de listado de pedidos con vista detallada logística.
 */
const OrdersListCore = ({
  title,
  orders,
  color = "primary",
  showTotalKey = "monto",
  isExpress = false,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState({});

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPedido(null);
  };

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <List>
            {orders?.map((pedido) => (
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
                        {formatPrice(pedido[showTotalKey])} • {pedido.fecha}
                      </Typography>
                      <Chip
                        label={pedido.estado}
                        size="small"
                        color={
                          pedido.estado === "Facturado"
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

      {/* MODAL DETALLE LOGÍSTICO */}

      <OrderDetail
        selectedPedido={selectedPedido}
        openModal={openModal}
        isExpress={isExpress}
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
};

export default OrdersListCore;
