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
    `${apiHost}${privateAPI}${ordersAPI}/my-orders`,
    token,
    {
      method: "GET",
    }
  );

  return data;
};
