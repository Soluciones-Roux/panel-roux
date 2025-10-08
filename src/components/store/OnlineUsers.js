import { makeAutoObservable, runInAction } from "mobx";
import { getStatsOnlineUsersLogic } from "./logic/OnlineUsers";

export class OnlineUsers {
  statsOnlineUsers = [];
  sellersCompany = [];
  error = { network: false, message: "" };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // ==========================
  //   STATS ONLINE USER
  // ==========================
  async getStatsOnlineUsers(token) {
    this.setLoading(true);
    this.clearError();

    const result = await getStatsOnlineUsersLogic(token);

    runInAction(() => {
      if (result.success) {
        this.statsOnlineUsers = result.statsOnlineUsers;
        this.sellersCompany = result.sellersCompany;
      } else {
        this.setError(result.error);
      }
      this.setLoading(false);
    });
  }

  // ==========================
  //   HELPERS
  // ==========================

  setLoading(state) {
    this.loading = state;
  }

  setError(message) {
    this.error = { network: true, message };
  }

  clearError() {
    this.error = { network: false, message: "" };
  }
}

export const OnlineUserStore = new OnlineUsers();
