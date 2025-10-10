import {
  getLocationUserService,
  getStatsOnlineUserService,
} from "../../services/OnlineUsers";

export const getStatsOnlineUsersLogic = async (token) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await getStatsOnlineUserService(token);

    if (!result) {
      throw new Error("No response from server");
    }

    if (result.success) {
      return {
        success: true,
        statsOnlineUsers: result.data,
        sellersCompany: result.seller_company,
      };
    } else {
      throw new Error(result.message || "Error getting Stats Online Users");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const getLocationUserLogic = async (token, user_id) => {
  try {
    if (!token) throw new Error("No Auth Token Send");

    const result = await getLocationUserService(token, user_id);

    if (!result) {
      throw new Error("No response from server");
    }

    if (result.success) {
      return {
        success: true,
        userLocations: result.data,
      };
    } else {
      throw new Error(result.message || "Error getting Location Users");
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};
