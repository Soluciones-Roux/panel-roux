import { useState } from "react";
import useAuth from "./useAuth";
import { orderStandardStore } from "../store/OrderStandardStore";

export const useOrderStandar = (navigation) => {
  const { token } = useAuth();

  const [cliente, setCliente] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const {
    myOrderStandar,
    getMyOrderStandar,
    createOrder,
    orderStandarTotal,
    pendingStandar,
    completedStandar,
  } = orderStandardStore;

  // ==========================
  //   PRODUCT MANAGEMENT
  // ==========================
  const addProduct = (product) => {
    const exists = items.find((i) => i.id === product.id);
    if (exists) {
      setItems(
        items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setItems([...items, { ...product, qty: 1 }]);
    }
    setSearch("");
  };

  const changeQty = (id, qty) => {
    if (qty <= 0) {
      setItems(items.filter((i) => i.id !== id));
    } else {
      setItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // ==========================
  //   CREATE ORDER
  // ==========================
  const handleCrearPedido = async () => {
    if (!cliente.name?.trim()) {
      alert("Error", "Debes ingresar un cliente");
      return;
    }
    if (items.length === 0) {
      alert("Error", "Debes agregar al menos un producto");
      return;
    }

    const pedido = {
      cliente: cliente.id,
      productos: items.map(({ id, name, qty, price }) => ({
        id,
        nombre: name,
        cantidad: qty,
        precio: price,
      })),
      total,
      fecha: new Date().toISOString(),
    };

    const result = await createOrder(token, pedido);
    if (!result) {
      alert("Error", "No se pudo crear el pedido");
      return;
    }

    alert("Éxito", "Pedido creado correctamente");
    navigation.goBack();
  };

  return {
    addProduct,
    changeQty,
    cliente,
    setCliente,
    search,
    setSearch,
    items,
    orderStandarTotal,
    handleCrearPedido,
    myOrderStandar,
    getMyOrderStandar,
    total,
    pendingStandar,
    completedStandar,
  };
};
