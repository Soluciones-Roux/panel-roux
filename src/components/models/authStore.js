// authStore.js
import { makeAutoObservable } from "mobx"; // Si usas MobX
import { loginService } from "../services/AuthServices";
// o si prefieres una solución más simple sin MobX:
// import { create } from 'zustand' // Alternativa con Zustand

class AuthStore {
  user = { visited: false };
  jwt = {
    token: null,
    expires: null,
    isRegistered: false,
    verificationMade: false,
    exists: false,
  };
  error = { network: false, message: "" };
  loading = false;

  constructor() {
    makeAutoObservable(this); // Descomenta si usas MobX
  }

  setToken(token, expires = null) {
    const expirationDate =
      expires || new Date(Date.now() + 1000 * 60 * 60 * 23);

    this.jwt = {
      ...this.jwt,
      token,
      expires: expirationDate,
      isRegistered: true,
      exists: true,
      verificationMade: true,
    };

    // Guardar en localStorage para persistencia
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_expires", expirationDate.toISOString());
    }
  }

  async login(credentials) {
    this.loading = true;
    this.error = { network: false, message: "" };

    try {
      const result = await loginService(credentials); // Asegúrate de importar loginService

      if (result && !result.response && !result.notFoundError) {
        this.setToken(result.accessToken);
        this.error = { network: false, message: "" };
        return { success: true, token: result };
      } else if (result && result.notFoundError) {
        this.error = {
          network: true,
          message: "Credenciales incorrectas",
        };
        return { success: false, error: "Credenciales incorrectas" };
      } else {
        this.error = {
          network: true,
          message: "Error desconocido",
        };
        return { success: false, error: "Error desconocido" };
      }
    } catch (error) {
      this.error = {
        network: true,
        message: error.message || "Error de conexión",
      };
      return { success: false, error: error.message };
    } finally {
      this.loading = false;
    }
  }

  get token() {
    // Verificar si el token ha expirado
    if (!this.jwt.expires || new Date() > new Date(this.jwt.expires)) {
      this.clearToken();
      return null;
    }
    return this.jwt.token;
  }

  get isAuthenticated() {
    return !!this.token;
  }

  clear() {
    this.jwt = {
      token: null,
      expires: null,
      isRegistered: false,
      verificationMade: false,
      exists: false,
    };
    this.error = { network: false, message: "" };

    // Limpiar localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_expires");
    }
  }

  clearError() {
    this.error = { network: false, message: "" };
  }

  // Cargar token desde localStorage al inicializar
  loadFromStorage() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      const expires = localStorage.getItem("auth_expires");

      if (token && expires) {
        this.jwt = {
          ...this.jwt,
          token,
          expires: new Date(expires),
          isRegistered: true,
          exists: true,
          verificationMade: true,
        };
      }
    }
  }
}

// Crear y exportar una instancia única
export const authStore = new AuthStore();

// Cargar datos del almacenamiento al inicializar
if (typeof window !== "undefined") {
  authStore.loadFromStorage();
}
