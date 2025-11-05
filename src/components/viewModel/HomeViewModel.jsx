import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import { observer } from "mobx-react";
import HomeView from "../view/HomeView";
import useAuth from "../hooks/useAuth";
import { useOrderStandar } from "../hooks/useOrder";
import moment from "moment";
import { useEffect, useState } from "react";
import { useOrdersExpress } from "../hooks/useOrderExpress";
import { useOnlineUsers } from "../hooks/useOnlineUsers";

const HomeViewModel = observer(() => {
  const { user, token } = useAuth();
  const {
    sellersCompany,
    statsOnlineUsers,
    getStatsOnlineUsers,
    getLocationUser,
    locationUser,
  } = useOnlineUsers();

  //load orders
  const {
    myOrderStandar,
    getMyOrderStandar,
    orderStandarTotal,
    pendingStandar,
    completedStandar,
  } = useOrderStandar(token);

  const {
    myOrdersExpress,
    getMyOrdersExpress,
    pendingExpress,
    completedExpress,
    orderExpressTotal,
  } = useOrdersExpress();

  const companyName = user?.name_company;
  const userName = user?.username;

  const [loading, setLoading] = useState(false);

  // Estadísticas principales
  const stats = {
    totalVendidoHoy: orderStandarTotal + orderExpressTotal,
    vendedoresOnline: 8,
    totalVendedores: 15,
    pedidosHoy: myOrderStandar?.length + myOrdersExpress?.length || 0,
    pedidosPendientes: pendingStandar + pendingExpress,
    pedidosCompletados: completedStandar + completedExpress,
  };

  // Estados de pedidos
  const estadosPedidos = [
    {
      id: 1,
      estado: "Completado",
      cantidad: stats.pedidosCompletados,
      color: "success",
      icon: <CheckCircleIcon />,
    },
    {
      id: 2,
      estado: "Pendiente",
      cantidad: stats.pedidosPendientes,
      color: "warning",
      icon: <PendingIcon />,
    },
  ];

  const pedidosEstandar = myOrderStandar?.map((order) => {
    return {
      id: order.id,
      cliente: order.customer_name,
      creado_por: order.seller_name,
      productos: order.items,
      total: order.total,
      estado: order.status_name,
      fecha: moment(order.created_at).format("YYYY-MM-DD HH:mm"),
      facturadoPor: order.completed_by_name,
      fechaFacturado: order.completed_at,
      facturaReferencia: order.bill_references,
      nota: order.note,
    };
  });

  const pedidosExpress = myOrdersExpress?.map((order) => {
    return {
      id: order.id,
      cliente: order.client_info,
      creado_por: order.seller_name,
      detalle_orden: order.order_details,
      total: order.total,
      estado: order.status_name,
      fecha: moment(order.created_at).format("YYYY-MM-DD HH:mm"),
      facturadoPor: order.completed_by_name,
      fechaFacturado: order.completed_at,
      facturaReferencia: order.bill_references,
    };
  });

  // Vendedores en línea

  const vendedoresOnline = statsOnlineUsers.map((user) => {
    return {
      id: user.user_id,
      nombre: user.username,
      ventasHoy:
        Number(user.total_order_standar) + Number(user.total_order_express),
      pedidos:
        Number(user.quantity_order_standar) +
        Number(user.quantity_order_express),
      ultimaConexion: moment(user.last_seen).format("YYYY/MM/DD HH:mm"),
    };
  });

  useEffect(() => {
    getMyOrderStandar(token);
    getMyOrdersExpress(token);
    getStatsOnlineUsers(token);
  }, []);

  // Modal Ubicaciones
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const handleUserLocations = async (seller) => {
    setOpenModalLocation(true);
    setLoading(true);
    await getLocationUser(token, seller.id);
    setLoading(false);
  };

  //Modal Crear Pedido Web
  const [openModalCreateOrder, setOpenModalCreateOrder] = useState(false);

  return (
    <HomeView
      userName={userName}
      companyName={companyName}
      stats={stats}
      vendedoresOnline={vendedoresOnline}
      estadosPedidos={estadosPedidos}
      pedidosEstandar={pedidosEstandar}
      pedidosExpress={pedidosExpress}
      sellersCompany={sellersCompany}
      loading={loading}
      getUserLocation
      handleUserLocation={handleUserLocations}
      openModalLocation={openModalLocation}
      setOpenModalLocation={setOpenModalLocation}
      locationUser={locationUser}
      openModalCreateOrder={openModalCreateOrder}
      setOpenModalCreateOrder={setOpenModalCreateOrder}
    />
  );
});

export default HomeViewModel;
