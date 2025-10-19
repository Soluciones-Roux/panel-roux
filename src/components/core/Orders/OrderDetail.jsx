import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { formatPrice } from "../../../utils/formatPrice";
import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useOrdersExpress } from "../../hooks/useOrderExpress";
import { useOrderStandar } from "../../hooks/useOrder";
import { NumericFormat } from "react-number-format";

const OrderDetail = ({
  selectedPedido,
  openModal,
  isExpress = false,
  isStandar = false,
  handleCloseModal,
}) => {
  const { markCompleteOrderExpress } = useOrdersExpress();
  const { markCompleteOrderStandar } = useOrderStandar();

  const [saveOrderCompleted, setSaveOrderCompleted] = useState({});
  const [loading, setLoading] = useState(false);

  const onChangeOrder = (e) => {
    const { name, value } = e.target;
    setSaveOrderCompleted((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderCompleted = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pedido = { ...saveOrderCompleted, idOrder: selectedPedido.id };

    try {
      if (isExpress) await markCompleteOrderExpress(pedido);
      if (isStandar) await markCompleteOrderStandar(pedido);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        component="form"
        onSubmit={handleOrderCompleted}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          width: "90%",
          maxWidth: 650,
          maxHeight: "85vh",
          overflowY: "auto",
          ":focus-visible": { outline: "none" },
        }}
      >
        {/* HEADER */}
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h6">Pedido #{selectedPedido?.id}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Cliente: <strong>{selectedPedido?.cliente}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fecha: {moment(selectedPedido?.fecha).format("YYYY-MM-DD HH:mm")}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* BLOQUE EXPRESS */}
        {isExpress && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              🧾 Pedido Express
            </Typography>

            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {selectedPedido?.detalle_orden}
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: "rgba(0, 123, 255, 0.03)",
                borderColor: "rgba(0,123,255,0.2)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "info.main", mb: 0.5 }}
              >
                ℹ️ Información
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Un pedido express no genera factura inmediata ni afecta
                inventarios. El área de logística registrará el valor final
                posteriormente.
              </Typography>
            </Paper>
          </Stack>
        )}

        {/* BLOQUE ESTÁNDAR */}
        {isStandar && (
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              🧾 Detalle de productos
            </Typography>

            {/* LISTA DE PRODUCTOS */}
            <Stack spacing={1}>
              {selectedPedido?.productos?.map((item) => (
                <Paper
                  key={item.id}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderColor: "#e0e0e0",
                    bgcolor: "grey.50",
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {item.product_name}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Cant: {item.quantity} · Unit: ${formatPrice(item.price)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "success.main" }}
                    >
                      {formatPrice(item.subtotal)}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            {/* RESUMEN */}
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2">Subtotal:</Typography>
                <Typography variant="subtitle2">
                  {formatPrice(
                    selectedPedido.productos?.reduce(
                      (acc, i) => acc + i.price * i.quantity,
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
                sx={{ mt: 1 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="success.main">
                  {formatPrice(selectedPedido.total)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}

        {/* BLOQUE ESTADO */}
        {selectedPedido?.estado === "Completado" ? (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: "rgba(0,128,0,0.03)",
              borderColor: "rgba(0,128,0,0.2)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "success.main", mb: 1 }}
            >
              ✅ Pedido Facturado
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
              <strong>Facturado por:</strong>{" "}
              {selectedPedido.facturadoPor || "—"} <br />
              <strong>Fecha:</strong>{" "}
              {moment(selectedPedido.fechaFacturado).format("YYYY-MM-DD HH:mm")}{" "}
              <br />
              <strong>Referencia factura:</strong>{" "}
              {selectedPedido.facturaReferencia || "—"} <br />
              <strong>Total:</strong> {formatPrice(selectedPedido.total)}
            </Typography>
          </Paper>
        ) : (
          <>
            {/* FORMULARIO DE COMPLETAR PEDIDO */}
            <NumericFormat
              customInput={TextField}
              fullWidth
              required
              label="Confirmar total del pedido"
              name="total"
              value={saveOrderCompleted?.total || ""}
              onValueChange={(values) => {
                const { floatValue } = values;
                onChangeOrder({
                  target: { name: "total", value: floatValue },
                });
              }}
              thousandSeparator="."
              decimalSeparator=","
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              required
              multiline
              minRows={2}
              label="Factura número referencia"
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
                loading ||
                !saveOrderCompleted.total ||
                !saveOrderCompleted.bill_reference ||
                Number(saveOrderCompleted.total) <= 0
              }
            >
              {loading ? "Procesando..." : "Marcar como completado"}
            </Button>
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
  isStandar: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
};

export default OrderDetail;
