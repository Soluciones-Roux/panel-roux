import { fetchPrivate } from "./config/fetch";
import { apiHost, privateAPI, quickOrdersApi } from "./config/host";

export const fetchMyOrdersExpressService = async (token, params = {}) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${quickOrdersApi}/web`,
    token,
    {
      method: "GET",
      params: params, // Agregar parámetros de fecha
    }
  );

  return data;
};

export const markCompleteOrderExpressService = async (token, orderExpress) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${quickOrdersApi}/${orderExpress.idOrder}/complete`,
    token,
    {
      method: "PUT",
      data: orderExpress,
    }
  );

  return data;
};
