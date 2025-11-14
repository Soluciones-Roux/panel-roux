import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import { useReports } from "../hooks/useReports";
import ReportsView from "../view/ReportsView";

const ReportsViewModel = observer(() => {
  const { user, token } = useAuth();
  const companyName = user?.name_company;
  const userName = user?.username;

  const [activeTab, setActiveTab] = useState(0);
  const [dateFilter, setDateFilter] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("day").format("YYYY-MM-DD"),
  });

  const {
    loading,
    error,
    salesReport,
    sellersReport,
    topProductsReport,
    customersReport,
    getSalesReport,
    getSellersReport,
    getTopProductsReport,
    getCustomersReport,
  } = useReports(token);

  // Cargar el reporte activo con filtros
  const loadActiveReport = async (filterParams) => {
    const params = {
      startDate: moment(filterParams.startDate).format("DD-MM-YYYY"),
      endDate: moment(filterParams.endDate).format("DD-MM-YYYY"),
    };

    switch (activeTab) {
      case 0:
        await getSalesReport(params);
        break;
      case 1:
        await getSellersReport(params);
        break;
      case 2:
        await getTopProductsReport(params);
        break;
      case 3:
        await getCustomersReport(params);
        break;
      default:
        break;
    }
  };

  // Cargar reporte inicial y cuando cambia el tab
  useEffect(() => {
    loadActiveReport(dateFilter);
  }, [activeTab]);

  // Manejadores de filtro de fecha
  const handleFilterApply = (newFilter) => {
    setDateFilter(newFilter);
    loadActiveReport(newFilter);
  };

  const handleFilterClear = () => {
    const defaultFilter = {
      startDate: moment().startOf("month").format("YYYY-MM-DD"),
      endDate: moment().endOf("day").format("YYYY-MM-DD"),
    };
    setDateFilter(defaultFilter);
    loadActiveReport(defaultFilter);
  };

  return (
    <ReportsView
      userName={userName}
      companyName={companyName}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      dateFilter={dateFilter}
      onFilterApply={handleFilterApply}
      onFilterClear={handleFilterClear}
      loading={loading}
      error={error}
      salesData={salesReport}
      sellersData={sellersReport}
      topProductsData={topProductsReport}
      customersData={customersReport}
    />
  );
});

export default ReportsViewModel;
