// utils/formatPrice.js

import { Decimal } from "decimal.js";

// ✅ Para mostrar en UI (sin errores de coma flotante)
export const formatPrice = (value) => {
  if (value == null || value === "") return "0";

  // Convertimos a Decimal para asegurar precisión
  const val = new Decimal(value);

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(val.toNumber());
};

// ✅ Para limpiar y guardar en DB (como número real)
export const cleanPriceValue = (value) => {
  if (value == null || value === "") return 0;

  const clean = String(value)
    .replace(/[^0-9.,]/g, "") // deja solo números, comas y puntos
    .replace(/\./g, "") // elimina puntos de miles
    .replace(",", "."); // convierte coma a punto decimal

  // Decimal elimina cualquier pérdida de precisión
  return new Decimal(clean).toDecimalPlaces(3).toNumber();
};
