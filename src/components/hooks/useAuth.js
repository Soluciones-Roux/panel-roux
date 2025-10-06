import { authStore } from "../store/authStore";
import moment from "moment";
import { useEffect } from "react";

export function useAuth() {
  const { user, jwt } = authStore;

  useEffect(() => {
    const now = moment.utc(); // fecha/hora actual en UTC
    const expires = moment(jwt.expires); // fecha de expiración del token
    const isValid = expires.isAfter(now); // true si el token sigue vigente

    console.log(isValid);

    if (!jwt.token || !isValid) {
      authStore.clear();
      // window.location.href = "/login";
    }
  }, [user]);

  return { user, token: jwt.token };
}

export default useAuth;
