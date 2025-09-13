// authStore.js
import { makeAutoObservable } from "mobx";
import { loginService } from "../services/AuthServices";
class AuthStore {
  user = {
    name: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    role: "Administrador",
    avatar: "/static/images/avatar/1.jpg",
  };
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
    makeAutoObservable(this);
    this.loadFromStorage();

    // Datos de ejemplo para desarrollo - eliminar en producción
    // if (process.env.NODE_ENV === "development" && !this.jwt.token) {
    //   this.user = {
    //     name: "Carlos Rodríguez",
    //     email: "carlos@empresa.com",
    //     role: "Administrador",
    //     avatar: "/static/images/avatar/1.jpg",
    //   };
    // }
  }

  setToken(token, expires = null) {
    const expirationDate =
      expires || new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 horas

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
      if (this.user) {
        localStorage.setItem("user_data", JSON.stringify(this.user));
      }
    }
  }

  setUser(userData) {
    this.user = userData;
    if (typeof window !== "undefined" && userData) {
      localStorage.setItem("user_data", JSON.stringify(userData));
    }
  }

  async login(credentials) {
    this.loading = true;
    this.error = { network: false, message: "" };

    try {
      const result = await loginService(credentials);

      if (result && result.accessToken) {
        this.setToken(result.accessToken);

        // Establecer información del usuario si viene en la respuesta
        if (result.user) {
          this.setUser(result.user);
        }

        this.error = { network: false, message: "" };
        return { success: true, token: result.accessToken };
      } else if (result && result.error === "not_found") {
        this.error = {
          network: true,
          message: "Credenciales incorrectas",
        };
        return { success: false, error: "Credenciales incorrectas" };
      } else {
        this.error = {
          network: true,
          message: "Error en el servidor",
        };
        return { success: false, error: "Error en el servidor" };
      }
    } catch (error) {
      this.error = {
        network: true,
        message: error.response?.data?.message || "Error de conexión",
      };
      return {
        success: false,
        error: error.response?.data?.message || "Error de conexión",
      };
    } finally {
      this.loading = false;
    }
  }

  async logout() {
    try {
      // 1. Llamar al endpoint de logout en el backend (si existe)
      // await api.post("/auth/logout");
    } catch (error) {
      console.log("Error en logout API:", error);
      // Continuamos aunque falle la API para limpiar el frontend
    } finally {
      // 2. Limpiar el estado local usando el método clear
      this.clear();

      // 3. Redirigir al login
      window.location.href = "/login";
    }
  }

  get token() {
    // Verificar si el token existe y no ha expirado
    if (!this.jwt.token || !this.jwt.expires) {
      return null;
    }

    if (new Date() > new Date(this.jwt.expires)) {
      this.clear();
      return null;
    }

    return this.jwt.token;
  }

  get isAuthenticated() {
    return !!this.token;
  }

  clear() {
    this.user = null;
    this.jwt = {
      token: null,
      expires: null,
      isRegistered: false,
      verificationMade: false,
      exists: false,
    };
    this.error = { network: false, message: "" };
    this.loading = false;

    // Limpiar localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_expires");
      localStorage.removeItem("user_data");

      // Limpiar cookies
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }

  clearError() {
    this.error = { network: false, message: "" };
  }

  // Cargar token y usuario desde localStorage al inicializar
  loadFromStorage() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      const expires = localStorage.getItem("auth_expires");
      const userData = localStorage.getItem("user_data");

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

      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user_data");
        }
      }
    }
  }

  // Método para verificar si el token está próximo a expirar (útil para refresh)
  isTokenExpiringSoon(minutes = 5) {
    if (!this.jwt.expires) return true;

    const now = new Date();
    const expirationDate = new Date(this.jwt.expires);
    const timeUntilExpiration = expirationDate.getTime() - now.getTime();

    return timeUntilExpiration < minutes * 60 * 1000;
  }
}

// Crear y exportar una instancia única
export const authStore = new AuthStore();
