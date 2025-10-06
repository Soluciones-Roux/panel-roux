import { fetchPrivate } from "./config/fetch";
import { apiHost, ordersAPI, privateAPI, quickOrdersApi } from "./config/host";

export const createOrderService = async (token, order) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${ordersAPI}`,
    token,
    {
      method: "POST",
      data: order,
    }
  );

  return data;
};

export const fetchMyOrdersService = async (token) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${ordersAPI}/my-orders`,
    token,
    {
      method: "GET",
    }
  );

  return data;
};

export const fetchMyOrdersExpressService = async (token) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${ordersAPI}/my-orders-express`,
    token,
    {
      method: "GET",
    }
  );

  return data;
};

export const createOrderExpressService = async (token, orderExpress) => {
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
