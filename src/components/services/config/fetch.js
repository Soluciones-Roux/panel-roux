// src/utils/fetch.js
import axios from "axios";
import { apiHost } from "./host";

const api = axios.create({
  baseURL: apiHost, // Ajusta a tu backend
  timeout: 10000, // 10s para cortar requests colgados
  headers: {
    "Content-Type": "application/json",
  },
});

// 🚀 Función para requests públicos
export const fetchPublic = async (endpoint, options = {}) => {
  try {
    const response = await api({
      url: endpoint,
      method: options.method || "GET",
      data: options.data || null,
      params: options.params || null,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 🚀 Función para requests privados (requiere JWT)
export const fetchPrivate = async (endpoint, token, options = {}) => {
  try {
    const response = await api({
      url: endpoint,
      method: options.method || "GET",
      data: options.data || null,
      params: options.params || null,
      headers: {
        ...api.defaults.headers,
        Authorization: `Bearer ${token}`, // token dinámico
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 🔥 Función centralizada para manejar errores
const handleError = (error) => {
  if (error.response) {
    console.error("❌ API Error:", error.response.data);
    throw new Error(error.response.data.errorMessage || "API Error");
  } else if (error.request) {
    console.error("❌ No response from server:", error.request);
    throw new Error("No response from server");
  } else {
    console.error("❌ Unexpected error:", error.message);
    throw new Error(error.message);
  }
};
