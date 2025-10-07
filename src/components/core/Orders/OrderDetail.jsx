import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { formatPrice } from "../../../utils/formatPrice";
import { useState } from "react";
import PropTypes from "prop-types";
// import { useOrderStandar } from "../../hooks/useOrder";
import moment from "moment";

const OrderDetail = ({
  selectedPedido,
  openModal,
  isExpress,
  handleCloseModal,
}) => {
  // const { handleCrearPedidoExpress } = useOrderStandar();

  const [saveOrderCompleted, setSaveOrderCompleted] = useState({});
  const onChangeOrder = (e) => {
    const { value, name } = e.target;
    setSaveOrderCompleted({ ...saveOrderCompleted, [name]: value });
  };

  const handleOrderCompleted = (e) => {
    e.preventDefault();

    if (isExpress) {
      let pedido = {
        ...saveOrderCompleted,
        idOrder: selectedPedido.id,
      };

      // handleCrearPedidoExpress(pedido);
      return saveOrderCompleted;
    }

    handleCloseModal();
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        component="form"
        onSubmit={(e) => {
          handleOrderCompleted(e);
        }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          width: 480,
          maxHeight: "80vh",
          overflowY: "auto",
          ":focus-visible": { outline: "none" },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Detalle Pedido #{selectedPedido?.id}
        </Typography>

        {selectedPedido && (
          <>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Cliente: <strong>{selectedPedido.cliente}</strong>
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Fecha: {selectedPedido.fecha}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              🧾 {isExpress ? "Detalle de pedido" : "Detalle de productos"}
            </Typography>

            {isExpress ? (
              <Typography variant="subtitle1" gutterBottom>
                {selectedPedido.detalle_orden}
              </Typography>
            ) : (
              <Box sx={{ mb: 2 }}>
                {selectedPedido.productos?.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2">
                      {item.product_name} × {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      {formatPrice(item.subtotal)}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {isExpress ? (
              <Box
                sx={{
                  p: 2,
                  my: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(0, 123, 255, 0.05)", // azul suave
                  border: "1px solid rgba(0, 123, 255, 0.2)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "info.main", mb: 1 }}
                >
                  ℹ️ Pedido Express
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  Un pedido <strong>express</strong> es un pedido rápido sin
                  factura inmediata ni afecta inventarios.
                  <br />
                  El equipo de <strong>logística</strong> se encargará de
                  facturarlo, asignar su número de referencia y registrar el{" "}
                  <strong>total correspondiente</strong>.
                </Typography>
              </Box>
            ) : (
              <>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">Subtotal:</Typography>
                  <Typography variant="subtitle2">
                    {formatPrice(
                      selectedPedido.items?.reduce(
                        (acc, i) => acc + parseFloat(i.price || 0),
                        0
                      )
                    )}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2">Descuento:</Typography>
                  <Typography variant="subtitle2">
                    {formatPrice(selectedPedido.descuento || 0)}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 1, mb: 3 }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    {/* {formatPrice(
                      selectedPedido[showTotalKey] || selectedPedido.total || 0
                    )} */}
                  </Typography>
                </Stack>
              </>
            )}

            {selectedPedido.estado === "Completado" ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(0, 128, 0, 0.05)",
                  border: "1px solid rgba(0,128,0,0.2)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "success.main", mb: 1 }}
                >
                  ✅ Pedido facturado
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  <strong>Facturado por:</strong>{" "}
                  {selectedPedido.facturadoPor || "—"} <br />
                  <strong>Fecha:</strong>{" "}
                  {moment(selectedPedido.fechaFacturado).format(
                    "YYYY-MM-DD HH:mm"
                  )}{" "}
                  <br />
                  <strong>Referencia factura:</strong>{" "}
                  {selectedPedido.facturaReferencia || "—"} <br />
                  <strong>Total:</strong> {formatPrice(selectedPedido.total)}
                </Typography>
              </Box>
            ) : (
              <>
                {" "}
                {/* FORM INPUTS */}
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Total pedido"
                  value={saveOrderCompleted.total || ""}
                  name="total"
                  onChange={onChangeOrder}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  required
                  multiline
                  minRows={2}
                  label="Factura Número Referencia"
                  value={saveOrderCompleted.bill_reference || ""}
                  name="bill_reference"
                  onChange={onChangeOrder}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Observación / Nota (opcional)"
                  value={saveOrderCompleted.note || ""}
                  name="note"
                  onChange={onChangeOrder}
                  sx={{ mb: 3 }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={
                    !saveOrderCompleted.total ||
                    !saveOrderCompleted.bill_reference ||
                    Number(saveOrderCompleted.total) <= 0
                  }
                >
                  Marcar como completado
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

OrderDetail.propTypes = {
  selectedPedido: PropTypes.object.isRequired,
  openModal: PropTypes.bool.isRequired,
  isExpress: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
};

export default OrderDetail;
