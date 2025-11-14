import { fetchPrivate } from "./config/fetch";
import { apiHost, privateAPI } from "./config/host";

// Obtener reporte de ventas
export const fetchSalesReportService = async (token, params = {}) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}/reports/sales`,
    token,
    {
      method: "GET",
      params: params,
    }
  );

  return data;
};

// Obtener reporte de vendedores
export const fetchSellersReportService = async (token, params = {}) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}/reports/sellers`,
    token,
    {
      method: "GET",
      params: params,
    }
  );

  return data;
};

// Obtener reporte de productos más vendidos
export const fetchTopProductsReportService = async (token, params = {}) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}/reports/top-products`,
    token,
    {
      method: "GET",
      params: params,
    }
  );

  return data;
};

// Obtener reporte de clientes
export const fetchCustomersReportService = async (token, params = {}) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}/reports/customers`,
    token,
    {
      method: "GET",
      params: params,
    }
  );

  return data;
};
