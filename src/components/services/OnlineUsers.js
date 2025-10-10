import { fetchPrivate } from "./config/fetch";
import {
  apiHost,
  locationsAPI,
  onlineUsersAPI,
  privateAPI,
} from "./config/host";

export const getStatsOnlineUserService = async (token) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${onlineUsersAPI}/stats`,
    token,
    {
      method: "GET",
    }
  );

  return data;
};

export const getLocationUserService = async (token, user_id) => {
  if (!token) return console.log("No Auth Token Send");
  const data = await fetchPrivate(
    `${apiHost}${privateAPI}${locationsAPI}/${user_id}/web`,
    token,
    {
      method: "GET",
    }
  );

  return data;
};
