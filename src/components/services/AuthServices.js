import { fetchPrivate, fetchPublic } from "./config/fetch";
import { apiHost, authAPI, privateAPI, publicAPI } from "./config/host";

export const loginService = async (body) => {
  const data = await fetchPublic(`${apiHost}${publicAPI}${authAPI}/login`, {
    method: "POST",
    data: body,
  });
  return data;
};
