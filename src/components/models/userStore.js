// import { loadUserLogic } from "./businessLogic/userLogic";

function createUserStore() {
  // note the use of this which refers to observable instance of the store
  return {
    users: [],
    error: { network: false },
    clear() {
      this.users = {};
    },

    async loadUser(token) {
      const response = null; // await loadUserLogic(token);
      if (response && !response.notFoundError) {
        this.users = response;
        this.error.network = false;
      } else if (response && response.notFoundError) {
        this.error.network = true;
        return false;
      }
      return response;
    },
    clearError() {
      this.error.network = false;
    },
  };
}

export const userStore = new createUserStore();
