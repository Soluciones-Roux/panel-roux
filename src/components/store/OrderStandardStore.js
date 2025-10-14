import { makeAutoObservable, runInAction } from "mobx";
import {
  createOrderStandarLogic,
  fetchMyOrderStandar,
  markCompleteOrderStandarLogic,
} from "./logic/OrderStandarLogic";
import { Token } from "@mui/icons-material";

export class OrderStandardStore {
  myOrderStandar = [];
  orderStandarTotal = 0;
  pendingStandar = 0;
  completedStandar = 0;
  loading = false;
  error = { network: false, message: "" };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // ==========================
  //   FETCH STANDARD ORDERS
  // ==========================
  async getMyOrderStandar(token) {
    this.setLoading(true);
    this.clearError();

    const result = await fetchMyOrderStandar(token);

    runInAction(() => {
      if (result.success) {
        this.setOrders(result.myOrders);
        this.recalculateTotals();
      } else {
        this.setError(result.error);
      }
      this.setLoading(false);
    });
  }

  // ==========================
  //   CREATE STANDARD ORDER
  // ==========================
  async createOrder(token, payload) {
    this.setLoading(true);
    this.clearError();

    const result = await createOrderStandarLogic(token, payload);

    runInAction(() => {
      if (!result.success) this.setError(result.error);
      this.setLoading(false);
    });

    return result.success;
  }

  async markCompleteOrderStandar(token, payload) {
    this.setLoading(true);
    this.clearError();

    const result = await markCompleteOrderStandarLogic(token, payload);

    if (result.success) {
      this.getMyOrderStandar(token);
    }

    runInAction(() => {
      if (!result.success) this.setError(result.error);
      this.setLoading(false);
    });

    return result.success;
  }

  // ==========================
  //   HELPERS
  // ==========================
  recalculateTotals() {
    this.orderStandarTotal = this.myOrderStandar.reduce(
      (acc, o) => acc + Number(o.total || 0),
      0
    );
    this.pendingStandar = this.myOrderStandar.filter(
      (o) => o.status_id === 1
    ).length;
    this.completedStandar = this.myOrderStandar.filter(
      (o) => o.status_id === 4
    ).length;
  }

  setOrders(orders) {
    this.myOrderStandar = orders;
  }

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

export const orderStandardStore = new OrderStandardStore();
