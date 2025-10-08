import { OnlineUserStore } from "../store/OnlineUsers";

export const useOnlineUsers = () => {
  const { sellersCompany, statsOnlineUsers, getStatsOnlineUsers } =
    OnlineUserStore;

  return {
    statsOnlineUsers,
    getStatsOnlineUsers,
    sellersCompany,
  };
};
