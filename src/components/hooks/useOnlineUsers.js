import { OnlineUserStore } from "../store/OnlineUsers";

export const useOnlineUsers = () => {
  const {
    sellersCompany,
    statsOnlineUsers,
    getStatsOnlineUsers,
    getLocationUser,
    locationUser,
  } = OnlineUserStore;

  return {
    statsOnlineUsers,
    getStatsOnlineUsers,
    sellersCompany,
    getLocationUser,
    locationUser,
  };
};
