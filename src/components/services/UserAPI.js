import { fetchPrivate } from "./config/fetch";
import { apiHost, privateAPI } from "./config/host";

export const getUsers = async (token) => {
  const data = await fetchPrivate(`${apiHost}${privateAPI}/users`, token, {
    method: "GET",
  });
  return data;
};
