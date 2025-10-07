import { orderExpressStore } from "../store/orderExpressStore";
import useAuth from "./useAuth";

export const useOrdersExpress = () => {
  const { token } = useAuth();

  const {
    myOrdersExpress,
    getMyOrdersExpress,
    pendingExpress,
    completedExpress,
    orderExpressTotal
  } = orderExpressStore;

  // const {
  //   myOrderStandar,
  //   getMyOrderStandar,
  //   createOrder,
  //   orderStandarTotal,
  //   pendingStandar,
  //   completedStandar,
  // } = orderStandardStore;

  const markCompleteOrderExpress = async (pedidoExpress) => {
    await orderExpressStore.markCompleteOrderExpress(token, pedidoExpress);
  };

  return {
    myOrdersExpress,
    getMyOrdersExpress,
    markCompleteOrderExpress,
    pendingExpress,
    completedExpress,
    orderExpressTotal
  };
};
