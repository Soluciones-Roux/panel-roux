import React from "react";
import { useLocalStore } from "mobx-react";
import { userStore } from "./userStore";

export function createRootStore() {
  return { userStore };
}

const storeContext = React.createContext(new createRootStore());

export const StoreProvider = ({ children }) => {
  const rootStore = useLocalStore(createRootStore);
  return (
    <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
