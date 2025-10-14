import { fetchPrivate } from "./config/fetch";
import { apiHost, ordersAPI, privateAPI } from "./config/host";

export const createOrderStandarService = async (token, order) => {
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

export const fetchMyOrdersStandarService = async (token) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${ordersAPI}/my-orders-web`,
    token,
    {
      method: "GET",
    }
  );

  return data;
};

export const markCompleteOrderStandarService = async (token, orderStandar) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${ordersAPI}/${orderStandar.idOrder}/complete`,
    token,
    {
      method: "PUT",
      data: orderStandar,
    }
  );

  return data;
};
