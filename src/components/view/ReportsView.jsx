import { useRef } from "react";
import PropTypes from "prop-types";
import { useReactToPrint } from "react-to-print";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Print as PrintIcon,
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import DateRangeFilter from "../core/DateRangeFilter";
import PrintableReport from "../core/PrintableReport";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const ReportsView = ({
  userName,
  companyName,
  activeTab,
  setActiveTab,
  dateFilter,
  onFilterApply,
  onFilterClear,
  loading,
  error,
  salesData,
  sellersData,
  topProductsData,
  customersData,
}) => {
  const printRef = useRef();

  const getActiveReportName = () => {
    switch (activeTab) {
      case 0:
        return "Ventas";
      case 1:
        return "Vendedores";
      case 2:
        return "Productos";
      case 3:
        return "Clientes";
      default:
        return "Reporte";
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Reporte_${getActiveReportName()}_${dateFilter.startDate}_${dateFilter.endDate}`,
  });



  const getReportData = () => {
    switch (activeTab) {
      case 0:
        return salesData;
      case 1:
        return sellersData;
      case 2:
        return topProductsData;
      case 3:
        return customersData;
      default:
        return null;
    }
  };

  const getReportConfig = () => {
    const data = getReportData();
    if (!data) return null;

    switch (activeTab) {
      case 0: // Ventas
        return {
          title: "Reporte de Ventas",
          columns: [
            { field: "fecha", label: "Fecha", align: "left" },
            { field: "pedidos_totales", label: "Pedidos", align: "center" },
            { field: "pedidos_completados", label: "Completados", align: "center" },
            { field: "pedidos_pendientes", label: "Pendientes", align: "center" },
            {
              field: "total_vendido",
              label: "Total Vendido",
              align: "right",
              format: (val) => `$${Number(val || 0).toLocaleString()}`
            },
          ],
          summary: data.summary || [],
          data: data.details || [],
        };
      case 1: // Vendedores
        return {
          title: "Reporte de Vendedores",
          columns: [
            { field: "vendedor", label: "Vendedor", align: "left" },
            { field: "pedidos_totales", label: "Pedidos", align: "center" },
            { field: "pedidos_completados", label: "Completados", align: "center" },
            {
              field: "total_ventas",
              label: "Total Ventas",
              align: "right",
              format: (val) => `$${Number(val || 0).toLocaleString()}`
            },
            {
              field: "promedio_venta",
              label: "Promedio",
              align: "right",
              format: (val) => `$${Number(val || 0).toLocaleString()}`
            },
          ],
          summary: data.summary || [],
          data: data.details || [],
        };
      case 2: // Productos
        return {
          title: "Reporte de Productos Más Vendidos",
          columns: [
            { field: "producto", label: "Producto", align: "left" },
            { field: "cantidad_vendida", label: "Cantidad", align: "center" },
            {
              field: "total_ventas",
              label: "Total Ventas",
              align: "right",
              format: (val) => `$${Number(val || 0).toLocaleString()}`
            },
            {
              field: "porcentaje",
              label: "% del Total",
              align: "center",
              format: (val) => `${Number(val || 0).toFixed(2)}%`
            },
          ],
          summary: data.summary || [],
          data: data.details || [],
        };
      case 3: // Clientes
        return {
          title: "Reporte de Clientes",
          columns: [
            { field: "cliente", label: "Cliente", align: "left" },
            { field: "telefono", label: "Teléfono", align: "left" },
            { field: "pedidos_totales", label: "Pedidos", align: "center" },
            {
              field: "total_compras",
              label: "Total Compras",
              align: "right",
              format: (val) => `$${Number(val || 0).toLocaleString()}`
            },
            { field: "ultima_compra", label: "Última Compra", align: "center" },
          ],
          summary: data.summary || [],
          data: data.details || [],
        };
      default:
        return null;
    }
  };

  const renderChart = () => {
    const data = getReportData();
    if (!data || !data.chart) return null;

    switch (activeTab) {
      case 0: // Ventas - Gráfico de líneas
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.chart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_vendido" stroke="#8884d8" name="Ventas" />
              <Line type="monotone" dataKey="pedidos_totales" stroke="#82ca9d" name="Pedidos" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 1: // Vendedores - Gráfico de barras
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendedor" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_ventas" fill="#8884d8" name="Ventas" />
              <Bar dataKey="pedidos_totales" fill="#82ca9d" name="Pedidos" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 2: // Productos - Gráfico de pastel
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.chart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.producto}
                outerRadius={80}
                fill="#8884d8"
                dataKey="cantidad_vendida"
              >
                {data.chart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 3: // Clientes - Gráfico de barras
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cliente" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_compras" fill="#8884d8" name="Compras" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const reportConfig = getReportConfig();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <AssessmentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Reportes y Estadísticas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {companyName} - Análisis y reportes detallados
        </Typography>
      </Box>

      {/* Filtro de fechas */}
      <DateRangeFilter onFilterApply={onFilterApply} onFilterClear={onFilterClear} />

      {/* Tabs de reportes */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab icon={<TrendingUpIcon />} label="Ventas" />
          <Tab icon={<PeopleIcon />} label="Vendedores" />
          <Tab icon={<InventoryIcon />} label="Productos" />
          <Tab icon={<GroupIcon />} label="Clientes" />
        </Tabs>
      </Card>

      {/* Contenido del reporte */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Gráfico */}
          {getReportData() && (
            <Card elevation={2} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Gráfico - {getActiveReportName()}
                </Typography>
                {renderChart()}
              </CardContent>
            </Card>
          )}

          {/* Acciones */}
          <Box sx={{ mb: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              disabled={!reportConfig}
            >
              Imprimir
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              disabled={!reportConfig}
            >
              Exportar PDF
            </Button>
          </Box>

          {/* Vista previa del reporte */}
          {reportConfig && (
            <Box sx={{ display: "none" }}>
              <PrintableReport
                ref={printRef}
                title={reportConfig.title}
                companyName={companyName}
                dateRange={dateFilter}
                data={reportConfig.data}
                columns={reportConfig.columns}
                summary={reportConfig.summary}
                userName={userName}
              />
            </Box>
          )}

          {/* Tabla visible en pantalla */}
          {reportConfig && (
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {reportConfig.title}
                </Typography>

                {/* Resumen */}
                {reportConfig.summary && reportConfig.summary.length > 0 && (
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {reportConfig.summary.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              {item.label}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: item.color || "primary.main" }}>
                              {item.value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {/* Datos simplificados en pantalla */}
                <Box sx={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
                        {reportConfig.columns.map((col, idx) => (
                          <th key={idx} style={{ padding: "12px", textAlign: col.align || "left" }}>
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reportConfig.data && reportConfig.data.length > 0 ? (
                        reportConfig.data.map((row, rowIdx) => (
                          <tr key={rowIdx} style={{ borderBottom: "1px solid #e0e0e0" }}>
                            {reportConfig.columns.map((col, colIdx) => (
                              <td key={colIdx} style={{ padding: "12px", textAlign: col.align || "left" }}>
                                {col.format ? col.format(row[col.field], row) : row[col.field]}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={reportConfig.columns.length} style={{ textAlign: "center", padding: "24px" }}>
                            <Typography variant="body2" color="text.secondary">
                              No hay datos para mostrar
                            </Typography>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

ReportsView.propTypes = {
  userName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  dateFilter: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  salesData: PropTypes.object,
  sellersData: PropTypes.object,
  topProductsData: PropTypes.object,
  customersData: PropTypes.object,
};

export default ReportsView;
