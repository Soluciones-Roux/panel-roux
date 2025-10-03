import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { orderStore } from "../store/orderStore";

export const useOrders = (token, navigation) => {
  const [cliente, setCliente] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]); // [{id, name, price, qty}]

  const { myOrders, getMyOrders, generalTotal } = orderStore;

  useEffect(() => {
    getMyOrders(token);
  }, []);

  const addProduct = (product) => {
    const exists = items.find((i) => i.id === product.id);
    if (exists) {
      setItems(
        items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setItems([...items, { ...product, qty: 1 }]);
    }
    setSearch(""); // limpiar búsqueda
  };

  const changeQty = (id, qty) => {
    if (qty <= 0) {
      setItems(items.filter((i) => i.id !== id));
    } else {
      setItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCrearPedido = async () => {
    if (!cliente.name.trim()) {
      Alert.alert("Error", "Debes ingresar un cliente");
      return;
    }
    if (items.length === 0) {
      Alert.alert("Error", "Debes agregar al menos un producto");
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

    //lógica creación.
    //backend, query transation, create order, insert items orders
    // return ok - salta alertar pedido creado con éxito

    const result = await orderStore.createOrder(token, pedido);
    //if result if bad, create local.

    console.log("Pedido creado:", pedido);
    Alert.alert("Éxito", "Pedido creado correctamente");
    navigation.goBack();
  };

  return {
    addProduct,
    changeQty,
    cliente,
    handleCrearPedido,
    items,
    search,
    setCliente,
    setSearch,
    total,
    myOrders,
    getMyOrders,
    generalTotal,
  };
};
