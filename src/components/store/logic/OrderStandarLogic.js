import {
  createOrderStandarService,
  fetchMyOrdersStandarService,
  markCompleteOrderStandarService,
} from "../../services/OrderStandarService";

export const createOrderStandarLogic = async (token, order) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await createOrderStandarService(token, order);

    if (!result) {
      throw new Error("No response from server");
    }

    if (result.success) {
      return { success: true };
    } else {
      throw new Error(result.message || "Error create order");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const fetchMyOrderStandar = async (token) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await fetchMyOrdersStandarService(token);

    if (!result) {
      throw new Error("No response from server");
    }

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

export const markCompleteOrderStandarLogic = async (token, orderStandar) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    // {
    //     "total": "2",
    //     "bill_reference": "d",
    //     "note": "a",
    //     "idOrder": 7,
    //     "idUser": 4
    // }

    if (!orderStandar.idOrder) {
      throw new Error("Order standar ID and User ID are required");
    }

    const result = await markCompleteOrderStandarService(token, orderStandar);

    if (!result) {
      throw new Error("No response from server");
    }

    console.log("result", result);

    if (result.status === 201) {
      return { success: true };
    } else {
      throw new Error(result.message || "Error completing order standar");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
