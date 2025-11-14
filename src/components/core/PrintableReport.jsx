import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import moment from "moment";

const PrintableReport = forwardRef(({ 
  title, 
  companyName, 
  dateRange, 
  data, 
  columns,
  summary,
  userName 
}, ref) => {
  return (
    <Box ref={ref} sx={{ p: 4, backgroundColor: "white", minHeight: "100vh" }}>
      {/* Header del reporte */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}>
          {companyName}
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Período: {dateRange.startDate} - {dateRange.endDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generado por: {userName} | Fecha: {moment().format("DD/MM/YYYY HH:mm")}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Resumen */}
      {summary && summary.length > 0 && (
        <Box sx={{ mb: 4, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Resumen
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
            {summary.map((item, index) => (
              <Box key={index}>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: item.color || "primary.main" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Tabla de datos */}
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {columns.map((column, index) => (
                <TableCell 
                  key={index} 
                  sx={{ 
                    color: "white", 
                    fontWeight: "bold",
                    textAlign: column.align || "left"
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  sx={{ 
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#f0f0f0" }
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell 
                      key={colIndex}
                      sx={{ textAlign: column.align || "left" }}
                    >
                      {column.format 
                        ? column.format(row[column.field], row) 
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No hay datos para mostrar
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #e0e0e0" }}>
        <Typography variant="caption" color="text.secondary">
          Este documento fue generado automáticamente por el sistema de gestión {companyName}
        </Typography>
      </Box>
    </Box>
  );
});

PrintableReport.displayName = "PrintableReport";

PrintableReport.propTypes = {
  title: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  dateRange: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func,
    })
  ).isRequired,
  summary: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string,
    })
  ),
  userName: PropTypes.string.isRequired,
};

export default PrintableReport;
