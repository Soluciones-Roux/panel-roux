# panel-roux — Documentación para desarrolladores

Pequeña guía minimalista para poner en marcha y entender rápidamente este proyecto frontend.

## ¿Qué es?

`panel-roux` es una base/frontend en React + Vite pensada para construir paneles administrativos y dashboards.

## Tech stack

- React 18
- Vite
- MUI (Material UI)
- MobX para estado
- Axios para llamadas HTTP
- ESLint para linting

## Requisitos

- Node.js (v16+ recomendado)
- npm o yarn

## Inicio rápido

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala dependencias:

```bash
npm install
# o
// yarn
yarn
```

3. Levanta el servidor de desarrollo:

```bash
npm run dev
```

El proyecto por defecto usa Vite en el puerto 3000 (puedes cambiarlo en `package.json` o en la configuración de Vite).

## Scripts útiles

- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — build de producción
- `npm run preview` — previsualizar el build localmente
- `npm run lint` — ejecutar ESLint

## Variables de entorno

Se usa `dotenv` en el proyecto. Añade un archivo `.env` en la raíz con las variables necesarias (por ejemplo API_HOST o similares). No incluyas secretos en el repo.

## Estructura principal (resumen)

- `src/` — código fuente
	- `components/` — componentes reutilizables y núcleo (Header, Layout, etc.)
	- `hooks/` — hooks personalizados
	- `services/` — servicios para llamadas a APIs y configuración de fetch/host
	- `store/` — stores de MobX y lógica relacionada
	- `ui/` — componentes UI (botones, etc.)
	- `view/` / `viewModel/` — vistas y view models
	- `pages/` — páginas de la app (Home, Login...)
	- `theme/` — tema MUI
	- `utils/` — utilidades (por ejemplo `formatPrice.js`)

## Convenciones rápidas

- Usa React function components y hooks.
- Mantén lógica de negocio en `viewModel` o `store` (MobX).
- Usa `services/*` para llamadas HTTP (centraliza host/config en `services/config`).

## Contribuir

1. Crea un branch a partir de `main`.
2. Abre PR describiendo el cambio.

## Contacto / Dudas

Si tienes dudas sobre la estructura o cómo integrar un servicio, abre un issue o contacta al equipo responsable.

---
Pequeña guía creada para desarrolladores — minimal y directa. Si quieres que añada secciones específicas (ej. tests, CI/CD, convenciones de commit), dime cuáles y las incluyo.
