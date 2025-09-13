// stores/AlertStore.js - CON MOBX (lo que ya deberías tener)
import { makeAutoObservable } from "mobx";

class AlertStore {
  alerts = [];

  constructor() {
    makeAutoObservable(this);
  }

  addAlert(alert) {
    const id = Date.now().toString();
    this.alerts.push({ id, ...alert });

    // Auto-remove after delay
    setTimeout(() => this.removeAlert(id), 5000);

    return id;
  }

  removeAlert(id) {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
  }

  // Helpers específicos
  success(message) {
    return this.addAlert({ type: "success", message });
  }

  error(message) {
    return this.addAlert({ type: "error", message });
  }

  warning(message) {
    return this.addAlert({ type: "warning", message });
  }

  info(message) {
    return this.addAlert({ type: "info", message });
  }
}

// Exportar instancia única
export const alertStore = new AlertStore();
