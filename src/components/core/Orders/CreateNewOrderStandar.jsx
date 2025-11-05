import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Modal,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../hooks/useAuth";
import { fetchPrivate } from "../../services/config/fetch";
import { apiHost } from "../../services/config/host";
import { formatPrice } from "../../../utils/formatPrice";
import { orderStandardStore } from "../../store/OrderStandardStore";
import { useOrderStandar } from "../../hooks/useOrder";

const CreateOrderStandarCard = ({ openModal, setOpenModal }) => {
  const { token } = useAuth();
  const { getMyOrderStandar } = useOrderStandar(token);

  const [customers, setCustomers] = useState([]);
  const [productList, setProductsList] = useState([]);

  const getCustomers = async () => {
    const data = await fetchPrivate(`${apiHost}/private/api/customers`, token, {
      method: "GET",
    });

    setCustomers(data);
  };

  const getProducts = async () => {
    const data = await fetchPrivate(`${apiHost}/private/api/products`, token, {
      method: "GET",
    });

    setProductsList(data);
  };

  useEffect(() => {
    getCustomers();
    getProducts();
  }, []);

  const [cliente, setCliente] = useState("");
  const [productos, setProductos] = useState([
    { id: "", quantity: 1, price: 0, name: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = () => {
    setProductos((prev) => [
      ...prev,
      { id: "", quantity: 1, price: 0, name: "" },
    ]);
  };

  const handleRemoveProduct = (index) => {
    setProductos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeProduct = (index, field, value) => {
    setProductos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const total = productos.reduce(
    (acc, p) => acc + (Number(p.price) || 0) * (Number(p.quantity) || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productosValidados = productos
        .filter((p) => p.id && p.quantity > 0)
        .map((p) => {
          const cantidad = Number(p.quantity);
          const precio = Number(p.price);
          const subtotal = cantidad * precio;

          return {
            id: Number(p.id),
            nombre: p.name?.trim(),
            cantidad,
            precio,
            subtotal,
          };
        });

      const payload = {
        cliente: Number(cliente),
        productos: productosValidados,
        total: productosValidados.reduce((acc, p) => acc + p.subtotal, 0),
        fecha: moment().toISOString(), // formato ISO válido para Joi.date().iso()
      };

      const res = await orderStandardStore.createOrder(token, payload);

      console.log(res);

      if (res) {
        setCliente("");
        setProductos([{ id: "", quantity: 1, price: 0, name: "" }]);
        getMyOrderStandar(token);
        setOpenModal(false);
        alert("Pedido creado");
        return;
      }
    } catch (error) {
      console.error("❌ Error creando pedido:", error);
      alert("Error al crear pedido. Ver consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Paper
        variant="outlined"
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
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Cerrar">
            <IconButton
              onClick={() => setOpenModal(false)}
              size="small"
              color="error"
              sx={{
                bgcolor: "error.light",
                color: "white",
                "&:hover": { bgcolor: "error.main" },
                mb: 1,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* HEADER */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            🧾 Crear Nuevo Pedido
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registra un pedido estándar con productos y totales.
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* CLIENTE */}
        <TextField
          select
          fullWidth
          required
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ mb: 3 }}
        >
          <option value="">Selecciona un cliente</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </TextField>

        {/* PRODUCTOS */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {productos.map((producto, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                borderColor: "#e0e0e0",
                bgcolor: "grey.50",
              }}
            >
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Producto #{index + 1}
                </Typography>
                {productos.length > 1 && (
                  <Tooltip title="Eliminar producto">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>

              <Autocomplete
                options={productList}
                getOptionLabel={(option) =>
                  `${option.name} — $${formatPrice(option.price)}`
                }
                value={productList.find((p) => p.id === producto.id) || null}
                onChange={(_, newValue) => {
                  handleChangeProduct(index, "id", newValue?.id || "");
                  handleChangeProduct(index, "name", newValue?.name || "");
                  handleChangeProduct(index, "price", newValue?.price || 0);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Producto"
                    placeholder="Escribe para buscar..."
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                }
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  type="number"
                  label="Cantidad"
                  value={producto.quantity}
                  onChange={(e) =>
                    handleChangeProduct(index, "quantity", e.target.value)
                  }
                  fullWidth
                />
                <NumericFormat
                  customInput={TextField}
                  label="Precio unitario"
                  value={producto.price}
                  onValueChange={(values) =>
                    handleChangeProduct(index, "price", values.floatValue || 0)
                  }
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="$"
                  fullWidth
                />
              </Stack>

              <Typography
                variant="body2"
                color="success.main"
                textAlign="right"
                sx={{ mt: 1 }}
              >
                Subtotal: $
                {(producto.price * producto.quantity || 0).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Stack>

        {/* AGREGAR PRODUCTO */}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={{ mb: 3 }}
        >
          Agregar Producto
        </Button>

        <Divider sx={{ mb: 2 }} />

        {/* TOTAL */}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6" color="success.main">
            ${total.toLocaleString()}
          </Typography>
        </Stack>

        {/* SUBMIT */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          disabled={loading || !cliente || productos.length === 0 || total <= 0}
        >
          {loading ? "Procesando..." : "Crear Pedido"}
        </Button>
      </Paper>
    </Modal>
  );
};

export default CreateOrderStandarCard;
