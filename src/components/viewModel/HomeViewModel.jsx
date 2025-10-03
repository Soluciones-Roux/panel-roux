import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import { observer } from "mobx-react";
import HomeView from "../view/HomeView";
import useAuth from "../hooks/useAuth";

const HomeViewModel = observer(() => {
  const { user } = useAuth();

  //load orders
  //load coords (sí vendedor tiene coord de hoy, cuenta cómo online)
  //load users
  //crar lógica vistas de vendedores

  const companyName = user.name_company;
  const userName = user.username;

  // Estadísticas principales
  const stats = {
    totalVendidoHoy: 12540.75,
    vendedoresOnline: 8,
    totalVendedores: 15,
    pedidosHoy: 23,
    pedidosPendientes: 7,
    pedidosFacturados: 16,
  };

  // Estados de pedidos
  const estadosPedidos = [
    {
      id: 1,
      estado: "Facturados",
      cantidad: stats.pedidosFacturados,
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

  // Pedidos recientes
  const pedidosRecientes = [
    {
      id: 1001,
      cliente: "Supermercado Central",
      monto: 1250.5,
      estado: "Facturado",
      fecha: "10:30 AM",
    },
    {
      id: 1002,
      cliente: "Tienda Don José",
      monto: 845.25,
      estado: "Pendiente",
      fecha: "11:15 AM",
    },
    // {
    //   id: 1003,
    //   cliente: "Minimarket La Esquina",
    //   monto: 1560.0,
    //   estado: "En camino",
    //   fecha: "9:45 AM",
    // },
    {
      id: 1004,
      cliente: "Abastos Hernández",
      monto: 920.3,
      estado: "Facturado",
      fecha: "8:20 AM",
    },
  ];

  // Vendedores en línea
  const vendedoresOnline = [
    { id: 1, nombre: "María González", ventasHoy: 3250.0, pedidos: 5 },
    { id: 2, nombre: "Roberto Sánchez", ventasHoy: 2850.75, pedidos: 4 },
    { id: 3, nombre: "Laura Mendoza", ventasHoy: 2100.5, pedidos: 3 },
    { id: 4, nombre: "Javier López", ventasHoy: 1850.25, pedidos: 3 },
  ];

  return (
    <HomeView
      userName={userName}
      companyName={companyName}
      stats={stats}
      vendedoresOnline={vendedoresOnline}
      estadosPedidos={estadosPedidos}
      pedidosRecientes={pedidosRecientes}
    />
  );
});

export default HomeViewModel;
