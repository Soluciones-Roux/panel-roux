import { useState } from "react";
import {
  fetchSalesReportService,
  fetchSellersReportService,
  fetchTopProductsReportService,
  fetchCustomersReportService,
} from "../services/ReportsService";

export const useReports = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [sellersReport, setSellersReport] = useState(null);
  const [topProductsReport, setTopProductsReport] = useState(null);
  const [customersReport, setCustomersReport] = useState(null);

  const getSalesReport = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSalesReportService(token, params);
      if (data?.success) {
        setSalesReport(data.data);
        return data.data;
      } else {
        throw new Error(data?.message || "Error obteniendo reporte de ventas");
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSellersReport = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSellersReportService(token, params);
      if (data?.success) {
        setSellersReport(data.data);
        return data.data;
      } else {
        throw new Error(
          data?.message || "Error obteniendo reporte de vendedores"
        );
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTopProductsReport = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopProductsReportService(token, params);
      if (data?.success) {
        setTopProductsReport(data.data);
        return data.data;
      } else {
        throw new Error(
          data?.message || "Error obteniendo reporte de productos"
        );
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCustomersReport = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCustomersReportService(token, params);
      if (data?.success) {
        setCustomersReport(data.data);
        return data.data;
      } else {
        throw new Error(
          data?.message || "Error obteniendo reporte de clientes"
        );
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
