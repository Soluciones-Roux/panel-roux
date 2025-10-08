import { orderExpressStore } from "../store/orderExpressStore";
import useAuth from "./useAuth";

export const useOrdersExpress = () => {
  const { token } = useAuth();

  const {
    myOrdersExpress,
    getMyOrdersExpress,
    pendingExpress,
    completedExpress,
    orderExpressTotal,
  } = orderExpressStore;

  const markCompleteOrderExpress = async (pedidoExpress) => {
    await orderExpressStore.markCompleteOrderExpress(token, pedidoExpress);
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
