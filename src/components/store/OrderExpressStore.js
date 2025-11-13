import { makeAutoObservable, runInAction } from "mobx";
import {
  fetchMyOrdersExpressLogic,
  markCompleteOrderExpressLogic,
} from "./logic/OrderExpressLogic";

export class OrderExpress {
  myOrdersExpress = [];
  orderExpressTotal = 0;
  pendingExpress = 0;
  completedExpress = 0;
  loading = false;
  error = { network: false, message: "" };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // ==========================
  //   FETCH EXPRESS ORDERS
  // ==========================
  async getMyOrdersExpress(token, params = {}) {
    this.setLoading(true);
    this.clearError();

    const result = await fetchMyOrdersExpressLogic(token, params);

    runInAction(() => {
      if (result.success) {
        this.setOrdersExpress(result.myOrdersExpress);
        this.recalculateTotals();
      } else {
        this.setError(result.error);
      }
      this.setLoading(false);
    });
  }

  // ==========================
  //   UPDATE COMPLETE EXPRESS ORDER
  // ==========================
  async markCompleteOrderExpress(token, payload) {
    this.setLoading(true);
    this.clearError();

    const result = await markCompleteOrderExpressLogic(token, payload);

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
    this.orderExpressTotal = this.myOrdersExpress.reduce(
      (acc, o) => acc + Number(o.total || 0),
      0
    );
    this.pendingExpress = this.myOrdersExpress.filter(
      (o) => o.status_id === 1
    ).length;
    this.completedExpress = this.myOrdersExpress.filter(
      (o) => o.status_id === 4
    ).length;
  }

  setOrdersExpress(orders) {
    this.myOrdersExpress = orders;
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

export const OrderExpressStore = new OrderExpress();
