import {
  fetchMyOrdersExpressService,
  markCompleteOrderExpressService,
} from "../../services/OrderExpressService";

export const fetchMyOrdersExpressLogic = async (token, params = {}) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await fetchMyOrdersExpressService(token, params);

    if (!result) {
      throw new Error("No response from server");
    }

    if (result.success) {
      return { success: true, myOrdersExpress: result.ordersExpress };
    } else {
      throw new Error(
        result.message || "Error fetching general orders express"
      );
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const markCompleteOrderExpressLogic = async (token, orderExpress) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    // {
    //     "total": "2",
    //     "bill_reference": "d",
    //     "note": "a",
    //     "idOrder": 7,
    //     "idUser": 4
    // }

    if (!orderExpress.idOrder) {
      throw new Error("Order express ID and User ID are required");
    }

    const result = await markCompleteOrderExpressService(token, orderExpress);

    if (!result) {
      throw new Error("No response from server");
    }

    if (result.status === 201) {
      return { success: true };
    } else {
      throw new Error(result.message || "Error create order express");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
