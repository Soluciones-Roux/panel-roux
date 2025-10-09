import { OrderExpressStore } from "../store/OrderExpressStore";
import useAuth from "./useAuth";

export const useOrdersExpress = () => {
  const { token } = useAuth();

  const {
    myOrdersExpress,
    getMyOrdersExpress,
    pendingExpress,
    completedExpress,
    orderExpressTotal,
  } = OrderExpressStore;

  const markCompleteOrderExpress = async (pedidoExpress) => {
    await OrderExpressStore.markCompleteOrderExpress(token, pedidoExpress);
  };

  return {
    myOrdersExpress,
    getMyOrdersExpress,
    markCompleteOrderExpress,
    pendingExpress,
    completedExpress,
    orderExpressTotal,
  };
};
