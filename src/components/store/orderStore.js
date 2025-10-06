import { makeAutoObservable } from "mobx";
import {
  createOrderExpressLogic,
  createOrderLogic,
  fetchMyOrders,
  fetchMyOrdersExpress,
} from "./logic/orderLogic";

class OrderStore {
  // ========== OBSERVABLE STATE ==========
  myOrders = [];
  myOrderExpress = [];
  generalTotal = 0;
  ordersPending = 0;
  ordersCompleted = 0;

  error = { network: false, message: "" };
  loading = false;

  // ========== CONSTRUCTOR ==========
  constructor() {
    makeAutoObservable(this);
  }

  // ========== ACTIONS ==========

  getMyOrders = async (token) => {
    this.loading = true;
    this.clearError();

    const result = await fetchMyOrders(token);

    if (result?.success) {
      //Order Standar - Remisión Estandar - Influye bodega
      this.myOrders = result.myOrders;

      const total = this.myOrders.reduce(
        (acc, order) => acc + Number(order.total),
        0
      );

      const ordersPending = this.myOrders.reduce(
        (acc, order) => acc + Number(order.status_id === 1),
        0
      );

      const ordersCompleted = this.myOrders.reduce(
        (acc, order) => acc + Number(order.status_id === 4),
        0
      );
      this.generalTotal = total;
      this.ordersPending = ordersPending;
      this.ordersCompleted = ordersCompleted;
    } else {
      this.setError(result?.error);
    }

    this.loading = false;
  };

  getMyOrdersExpress = async (token) => {
    this.loading = true;
    this.clearError();

    const result = await fetchMyOrdersExpress(token);

    if (result?.success) {
      //Order Standar - Remisión Estandar - Influye bodega
      this.myOrderExpress = result.myOrdersExpress;

      const ordersPending = this.myOrderExpress.reduce(
        (acc, order) => acc + Number(order.status_id === 1),
        0
      );

      const ordersCompleted = this.myOrderExpress.reduce(
        (acc, order) => acc + Number(order.status_id == 4),
        0
      );

      const total = this.myOrderExpress.reduce(
        (acc, order) => acc + Number(order.total),
        0
      );

      this.generalTotal += total;
      this.ordersPending += ordersPending;
      this.ordersCompleted += ordersCompleted;
    } else {
      this.setError(result?.error);
    }

    this.loading = false;
  };

  createOrder = async (token, order) => {
    this.loading = true;
    this.clearError();

    const result = await createOrderLogic(token, order);

    if (result?.success) {
      return true;
    } else {
      this.setError(result?.error);
    }

    this.loading = false;
  };

  createOrderExpress = async (token, orderExpress) => {
    this.loading = true;
    this.clearError();

    const result = await createOrderExpressLogic(token, orderExpress);

    if (result?.success) {
      return true;
    } else {
      this.setError(result?.error);
    }

    this.loading = false;
  };

  // ========== HELPERS ==========

  setError = (message) => {
    this.error = { network: true, message };
  };

  clearError = () => {
    this.error = { network: false, message: "" };
  };
}

// ========== EXPORT SINGLE INSTANCE ==========
export const orderStore = new OrderStore();
