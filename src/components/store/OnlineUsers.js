import { makeAutoObservable, runInAction } from "mobx";
import {
  getLocationUserLogic,
  getStatsOnlineUsersLogic,
} from "./logic/OnlineUsers";

export class OnlineUsers {
  statsOnlineUsers = [];
  sellersCompany = [];
  locationUser = [];
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

  async getLocationUser(token, user_id) {
    this.setLoading(true);
    this.clearError();

    const result = await getLocationUserLogic(token, user_id);

    runInAction(() => {
      if (result.success) {
        this.locationUser = result.userLocations;
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
