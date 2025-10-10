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

  //load coords (sí vendedor tiene coord de hoy, cuenta cómo online)
  //load users
  //crar lógica vistas de vendedores

  const companyName = user.name_company;
  const userName = user.username;

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
    // {
    //   id: 3,
    //   estado: "En camino",
    //   cantidad: 5,
    //   color: "info",
    //   icon: <ShippingIcon />,
    // },
    // {
    //   id: 4,
    //   estado: "Cancelado",
    //   cantidad: 2,
    //   color: "error",
    //   icon: <CancelIcon />,
    // },
  ];

  const pedidosEstandar = myOrderStandar?.map((order) => {
    return {
      id: order.id,
      cliente: order.customer_name,
      productos: order.items,
      monto: order.total,
      estado: order.status_name,
      fecha: moment(order.created_at).format("YYYY-MM-DD HH:mm"),
    };
  });

  const pedidosExpress = myOrdersExpress?.map((order) => {
    return {
      id: order.id,
      cliente: order.client_info,
      detalle_orden: order.order_details,
      total: order.total,
      estado: order.status_name,
      fecha: moment(order.created_at).format("YYYY-MM-DD HH:mm"),
      facturadoPor: order.completed_by_name,
      fechaFacturado: order.completed_at,
      facturaReferencia: order.bill_references,
    };
  });

  // Pedidos recientes
  // const pedidosEstandar = [
  //   {
  //     id: 1001,
  //     cliente: "Supermercado Central",
  //     monto: 1250.5,
  //     estado: "Facturado",
  //     fecha: "10:30 AM",
  //   },
  //   {
  //     id: 1002,
  //     cliente: "Tienda Don José",
  //     monto: 845.25,
  //     estado: "Pendiente",
  //     fecha: "11:15 AM",
  //   },
  //   // {
  //   //   id: 1003,
  //   //   cliente: "Minimarket La Esquina",
  //   //   monto: 1560.0,
  //   //   estado: "En camino",
  //   //   fecha: "9:45 AM",
  //   // },
  //   {
  //     id: 1004,
  //     cliente: "Abastos Hernández",
  //     monto: 920.3,
  //     estado: "Facturado",
  //     fecha: "8:20 AM",
  //   },
  // ];

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

  const sellerLocations = [
    {
      latitude: 3.475058,
      longitude: -76.481571,
      created_at: "2025-09-26T13:47:55Z",
    },
    {
      latitude: 3.476102,
      longitude: -76.482202,
      created_at: "2025-09-26T13:52:55Z",
    },
  ];

  const [openModalLocation, setOpenModalLocation] = useState(false);

  const handleUserLocations = async (seller) => {
    console.log(seller.id);
    setOpenModalLocation(true);
    setLoading(true);
    await getLocationUser(token, seller.id);
    setLoading(false);
  };

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
      locations={sellerLocations}
      loading={loading}
      getUserLocation
      handleUserLocation={handleUserLocations}
      openModalLocation={openModalLocation}
      setOpenModalLocation={setOpenModalLocation}
      locationUser={locationUser}
    />
  );
});

export default HomeViewModel;
