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

    const pedido = {
      ...saveOrderCompleted,
      idOrder: selectedPedido.id,
    };

    try {
      if (isExpress) await markCompleteOrderExpress(pedido);
      if (isStandar) await markCompleteOrderStandar(pedido);
    } finally {
      setLoading(false);
      // setSaveOrderCompleted({});
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

            {/* ======== BLOQUE EXPRESS ======== */}
            {isExpress && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  🧾 Detalle de pedido (Express)
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {selectedPedido.detalle_orden}
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    my: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(0, 123, 255, 0.05)",
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
                    Un pedido <strong>express</strong> no genera factura
                    inmediata ni afecta inventarios.
                    <br />
                    El equipo de <strong>logística</strong> registrará el{" "}
                    <strong>total correspondiente</strong> posteriormente.
                  </Typography>
                </Box>
              </>
            )}

            {/* ======== BLOQUE STANDAR ======== */}
            {isStandar && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  🧾 Detalle de productos
                </Typography>
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

                <Divider sx={{ my: 2 }} />

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
                  <Typography variant="h6">
                    Total: {formatPrice(selectedPedido.monto)}
                  </Typography>
                </Stack>
              </>
            )}

            {/* ======== BLOQUE ESTADO ======== */}
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
                {/* ======== FORM ======== */}
                <NumericFormat
                  customInput={TextField}
                  fullWidth
                  required
                  label="Confirmar Total pedido"
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
