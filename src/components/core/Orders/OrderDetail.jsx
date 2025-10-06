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
import { useOrders } from "../../hooks/useOrder";
import moment from "moment";

const OrderDetail = ({
  selectedPedido,
  openModal,
  isExpress,
  handleCloseModal,
}) => {
  const { handleCrearPedidoExpress } = useOrders();

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

      handleCrearPedidoExpress(pedido);
      return saveOrderCompleted;
    }

    handleCloseModal();
  };

  console.log("selected", selectedPedido);

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
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "text.secondary" }}
              >
                Un pedido express es un pedido rápido sin factura inmediata ni
                afecta inventarios. El equipo de logística lo facturará y
                asignará su número de referencia junto con el total
                correspondiente.
              </Typography>
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

            {selectedPedido.estado === "Facturado" ? (
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "text.secondary" }}
              >
                Este pedido ya fue facturado.
                <br />
                Facturado por: {selectedPedido.facturadoPor}
                <br />
                Fecha completado:{" "}
                {moment(selectedPedido.fechaFacturado).format(
                  "YYYY-MM-DD HH:mm"
                )}
                <br />
                Factura referencia: {selectedPedido.facturaReferencia}
                <br />
                Total factura generada: {formatPrice(selectedPedido.total)}
              </Typography>
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
