import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const DateRangeFilter = ({ onFilterApply, onFilterClear }) => {
  const [startDate, setStartDate] = useState(
    moment().startOf("day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("day").format("YYYY-MM-DD")
  );

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      if (moment(startDate).isAfter(moment(endDate))) {
        alert("La fecha de inicio no puede ser mayor a la fecha final");
        return;
      }
      onFilterApply({ startDate, endDate });
    }
  };

  const handleClearFilter = () => {
    const today = moment().format("YYYY-MM-DD");
    setStartDate(today);
    setEndDate(today);
    onFilterClear();
  };

  const handleQuickFilter = (days) => {
    const end = moment().endOf("day").format("YYYY-MM-DD");
    const start = moment().subtract(days, "days").startOf("day").format("YYYY-MM-DD");
    setStartDate(start);
    setEndDate(end);
    onFilterApply({ startDate: start, endDate: end });
  };

  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CalendarIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6">Filtro de Fechas</Typography>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Fecha Inicio"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Fecha Fin"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FilterIcon />}
              onClick={handleApplyFilter}
              fullWidth
            >
              Aplicar Filtro
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ClearIcon />}
              onClick={handleClearFilter}
              fullWidth
            >
              Limpiar
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Typography variant="body2" sx={{ mr: 1, alignSelf: "center" }}>
                Accesos rápidos:
              </Typography>
              <Chip
                label="Hoy"
                onClick={() => handleQuickFilter(0)}
                color="primary"
                variant="outlined"
                size="small"
              />
              <Chip
                label="Últimos 7 días"
                onClick={() => handleQuickFilter(7)}
                color="primary"
                variant="outlined"
                size="small"
              />
              <Chip
                label="Últimos 15 días"
                onClick={() => handleQuickFilter(15)}
                color="primary"
                variant="outlined"
                size="small"
              />
              <Chip
                label="Últimos 30 días"
                onClick={() => handleQuickFilter(30)}
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

DateRangeFilter.propTypes = {
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
};

export default DateRangeFilter;
