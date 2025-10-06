import {
  createOrderExpressService,
  createOrderService,
  fetchMyOrdersExpressService,
  fetchMyOrdersService,
} from "../../services/OrderServices";

export const createOrderLogic = async (token, order) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await createOrderService(token, order);

    if (!result) {
      throw new Error("No response from server");
    }

    if (result.status === 201) {
      return { success: true };
    } else {
      throw new Error(result.message || "Error create order");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const fetchMyOrders = async (token) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await fetchMyOrdersService(token);

    if (!result) {
      throw new Error("No response from server");
    }

    console.log(result);
    if (result.success) {
      return { success: true, myOrders: result.data };
    } else {
      throw new Error(
        result.message || "Error fetching general orders standar"
      );
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const fetchMyOrdersExpress = async (token) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await fetchMyOrdersExpressService(token);

    if (!result) {
      throw new Error("No response from server");
    }

    console.log(result);
    if (result.success) {
      return { success: true, myOrdersExpress: result.data };
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

export const createOrderExpressLogic = async (token, orderExpress) => {
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

    const result = await createOrderExpressService(token, orderExpress);

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
