# Sistema de Reportes - Panel Roux

## 📊 Resumen

Se ha implementado un sistema completo de reportes con gráficos interactivos, impresión y exportación de datos. El sistema utiliza **react-to-print** para generación de reportes imprimibles y **Recharts** para visualización de datos.

---

## 🎯 Funcionalidades Implementadas

### 1. **Tipos de Reportes**

#### a) Reporte de Ventas
- Ventas diarias en el período seleccionado
- Total de pedidos (completados y pendientes)
- Gráfico de líneas con evolución temporal
- Resumen: Total pedidos, completados, pendientes, monto total y promedio

#### b) Reporte de Vendedores
- Performance individual por vendedor
- Total de ventas y pedidos por vendedor
- Gráfico de barras comparativo
- Resumen: Total vendedores, pedidos, ventas totales y promedio

#### c) Reporte de Productos Más Vendidos
- Top 20 productos por cantidad vendida
- Porcentaje sobre el total de ventas
- Gráfico de pastel para visualización
- Resumen: Productos vendidos, cantidad total y ventas totales

#### d) Reporte de Clientes
- Top 50 clientes por volumen de compras
- Historial de compras y última compra
- Gráfico de barras de mejores clientes
- Resumen: Total clientes, pedidos, compras y promedio

### 2. **Características**

✅ Filtros de fecha con accesos rápidos  
✅ Visualización con gráficos interactivos (Recharts)  
✅ Impresión de reportes profesionales  
✅ Resúmenes ejecutivos con métricas clave  
✅ Diseño responsivo Material-UI  
✅ Navegación por tabs  
✅ Exportación preparada (PDF)  

---

## 📁 Archivos Creados/Modificados

### **Frontend (panel-roux)**

#### Nuevos Archivos:

1. **`src/pages/Reports.jsx`**
   - Página principal de reportes
   - Wrapper del ViewModel

2. **`src/components/view/ReportsView.jsx`**
   - Vista principal con tabs de reportes
   - Renderizado de gráficos (Recharts)
   - Tabla de datos
   - Botones de impresión y exportación

3. **`src/components/viewModel/ReportsViewModel.jsx`**
   - Lógica de negocio de reportes
   - Gestión de estado y filtros
   - Carga de datos por tipo de reporte

4. **`src/components/core/PrintableReport.jsx`**
   - Componente reutilizable para reportes imprimibles
   - Formato profesional para impresión
   - Header, resumen, tabla y footer

5. **`src/components/services/ReportsService.js`**
   - Servicios HTTP para consumir endpoints
   - Funciones para cada tipo de reporte

6. **`src/components/hooks/useReports.js`**
   - Hook personalizado para gestión de reportes
   - Estado y funciones de carga

#### Archivos Modificados:

7. **`src/AppRoutes.jsx`**
   - Ruta agregada: `/reports`
   - Ruta agregada: `/dashboard`

8. **`package.json`**
   - Dependencias agregadas:
     - `react-to-print`: ^2.15.1
     - `recharts`: ^2.10.3

---

### **Backend (api-roux)**

#### Nuevos Archivos:

1. **`src/controllers/reportsController.js`**
   - Controladores para 4 tipos de reportes
   - Queries SQL optimizadas
   - Cálculos de resúmenes y métricas

2. **`src/routes/reportsRoutes.js`**
   - Rutas REST para endpoints de reportes
   - Middleware de autenticación

#### Archivos Modificados:

3. **`src/server.js`**
   - Ruta registrada: `/private/api/reports`

---

## 🔌 Endpoints API

### Base URL: `/private/api/reports`

Todos los endpoints requieren autenticación JWT.

#### 1. GET `/private/api/reports/sales`

**Descripción:** Reporte de ventas por día

**Query Params:**
- `startDate` (opcional): Fecha inicio DD-MM-YYYY
- `endDate` (opcional): Fecha fin DD-MM-YYYY

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "summary": [
      { "label": "Total Pedidos", "value": "150", "color": "primary.main" },
      { "label": "Completados", "value": "120", "color": "success.main" },
      { "label": "Pendientes", "value": "30", "color": "warning.main" },
      { "label": "Total Vendido", "value": "$45,000", "color": "primary.main" },
      { "label": "Promedio Venta", "value": "$375", "color": "info.main" }
    ],
    "details": [
      {
        "fecha": "15-11-2024",
        "pedidos_totales": "25",
        "pedidos_completados": "20",
        "pedidos_pendientes": "5",
        "total_vendido": "7500"
      }
    ],
    "chart": [ /* datos para gráfico */ ]
  }
}
```

#### 2. GET `/private/api/reports/sellers`

**Descripción:** Reporte de performance de vendedores

**Query Params:**
- `startDate` (opcional): Fecha inicio DD-MM-YYYY
- `endDate` (opcional): Fecha fin DD-MM-YYYY

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "summary": [
      { "label": "Total Vendedores", "value": "8", "color": "primary.main" },
      { "label": "Total Pedidos", "value": "150", "color": "info.main" },
      { "label": "Total Ventas", "value": "$45,000", "color": "success.main" },
      { "label": "Promedio por Vendedor", "value": "$5,625", "color": "warning.main" }
    ],
    "details": [
      {
        "vendedor": "Juan Pérez",
        "pedidos_totales": "30",
        "pedidos_completados": "28",
        "total_ventas": "12000",
        "promedio_venta": "428.57"
      }
    ],
    "chart": [ /* Top 10 vendedores */ ]
  }
}
```

#### 3. GET `/private/api/reports/top-products`

**Descripción:** Productos más vendidos

**Query Params:**
- `startDate` (opcional): Fecha inicio DD-MM-YYYY
- `endDate` (opcional): Fecha fin DD-MM-YYYY

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "summary": [
      { "label": "Productos Vendidos", "value": "45", "color": "primary.main" },
      { "label": "Cantidad Total", "value": "850", "color": "info.main" },
      { "label": "Total en Ventas", "value": "$38,000", "color": "success.main" }
    ],
    "details": [
      {
        "producto": "Producto A",
        "cantidad_vendida": "120",
        "total_ventas": "8400",
        "porcentaje": 22.11
      }
    ],
    "chart": [ /* Top 10 productos */ ]
  }
}
```

#### 4. GET `/private/api/reports/customers`

**Descripción:** Reporte de clientes

**Query Params:**
- `startDate` (opcional): Fecha inicio DD-MM-YYYY
- `endDate` (opcional): Fecha fin DD-MM-YYYY

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "summary": [
      { "label": "Total Clientes", "value": "85", "color": "primary.main" },
      { "label": "Total Pedidos", "value": "150", "color": "info.main" },
      { "label": "Total Compras", "value": "$45,000", "color": "success.main" },
      { "label": "Promedio por Cliente", "value": "$529.41", "color": "warning.main" }
    ],
    "details": [
      {
        "cliente": "Cliente ABC S.A.",
        "telefono": "555-1234",
        "pedidos_totales": "8",
        "total_compras": "3500",
        "ultima_compra": "15/11/2024"
      }
    ],
    "chart": [ /* Top 10 clientes */ ]
  }
}
```

---

## 🎨 Componentes UI

### ReportsView

Componente principal que incluye:

1. **Tabs de Navegación**
   - Ventas
   - Vendedores
   - Productos
   - Clientes

2. **Filtro de Fechas**
   - Componente reutilizado del dashboard
   - Accesos rápidos integrados

3. **Visualización de Gráficos**
   - LineChart: Ventas por día
   - BarChart: Vendedores y Clientes
   - PieChart: Productos

4. **Tabla de Datos**
   - Visualización en pantalla
   - Responsive
   - Formateo de montos

5. **Botones de Acción**
   - Imprimir (funcional)
   - Exportar PDF (preparado)

### PrintableReport

Plantilla de impresión que incluye:

- Header con logo y título
- Información del período
- Resumen ejecutivo
- Tabla formateada
- Footer con información del sistema

---

## 🔄 Flujo de Datos

### Generación de Reportes:

```
Usuario selecciona tipo de reporte (Tab)
         ↓
ReportsViewModel detecta cambio
         ↓
Llama a loadActiveReport()
         ↓
Convierte fechas (YYYY-MM-DD → DD-MM-YYYY)
         ↓
Ejecuta función de hook según el tab:
├─→ getSalesReport()
├─→ getSellersReport()
├─→ getTopProductsReport()
└─→ getCustomersReport()
         ↓
Servicio HTTP hace GET request
         ↓
Backend ejecuta queries SQL
         ↓
Retorna summary, details y chart
         ↓
Hook actualiza estado
         ↓
ReportsView renderiza datos
         ↓
Usuario ve gráfico y tabla
```

### Impresión:

```
Usuario hace clic en "Imprimir"
         ↓
handlePrint() invoca react-to-print
         ↓
Usa printRef vinculado a PrintableReport
         ↓
Genera vista de impresión
         ↓
Abre diálogo del navegador
```

---

## 📊 Librerías Utilizadas

### 1. **react-to-print** (v2.15.1)
- **Uso:** Generación de reportes imprimibles
- **Características:**
  - Impresión directa desde el navegador
  - Preserva estilos CSS
  - Compatible con componentes React
  - Configuración de título de documento

### 2. **Recharts** (v2.10.3)
- **Uso:** Visualización de datos
- **Gráficos implementados:**
  - LineChart: Tendencias temporales
  - BarChart: Comparaciones
  - PieChart: Distribuciones porcentuales
- **Características:**
  - Responsivo
  - Interactivo (tooltips)
  - Personalizable

---

## 🚀 Uso

### 1. Instalar Dependencias

```bash
cd panel-roux
npm install
```

Esto instalará `react-to-print` y `recharts`.

### 2. Acceder al Módulo

1. Iniciar sesión en el panel
2. Click en menú hamburguesa
3. Seleccionar "Reportes"
4. O navegar a: `http://localhost:3000/reports`

### 3. Generar Reporte

1. Seleccionar tipo de reporte (tab)
2. Ajustar filtro de fechas
3. Hacer clic en "Aplicar Filtro"
4. Ver gráficos y datos

### 4. Imprimir

1. Hacer clic en botón "Imprimir"
2. Se abre vista previa de impresión
3. Configurar impresora o guardar como PDF
4. Imprimir

---

## 🎯 Métricas Calculadas

### Reporte de Ventas
- **Total Pedidos:** Suma de todos los pedidos
- **Completados:** Pedidos con status_id = 4
- **Pendientes:** Pedidos con status_id = 1
- **Total Vendido:** Suma de montos de pedidos completados
- **Promedio Venta:** Total vendido / Pedidos completados

### Reporte de Vendedores
- **Total Vendedores:** Count de vendedores con pedidos
- **Total Pedidos:** Suma de pedidos de todos los vendedores
- **Total Ventas:** Suma de ventas de todos los vendedores
- **Promedio por Vendedor:** Total ventas / Total vendedores

### Reporte de Productos
- **Productos Vendidos:** Count distinct de productos
- **Cantidad Total:** Suma de unidades vendidas
- **Total en Ventas:** Suma de subtotales
- **Porcentaje:** (Ventas producto / Total ventas) * 100

### Reporte de Clientes
- **Total Clientes:** Count de clientes con pedidos
- **Total Pedidos:** Suma de pedidos de todos los clientes
- **Total Compras:** Suma de montos de todos los pedidos
- **Promedio por Cliente:** Total compras / Total clientes

---

## 💾 Queries SQL Optimizadas

Todas las queries utilizan:
- ✅ Índices de fechas
- ✅ Filtros por companyId
- ✅ UNION ALL para combinar orders y quick_orders
- ✅ LEFT JOIN para incluir vendedores sin ventas
- ✅ COALESCE para valores NULL
- ✅ Agrupaciones eficientes
- ✅ Límites en resultados (TOP 20, TOP 50)

---

## 🔮 Mejoras Futuras

1. **Exportación PDF real** - Implementar generación de PDF con jsPDF
2. **Exportación a Excel** - Agregar export a .xlsx
3. **Reportes programados** - Envío automático por email
4. **Más tipos de gráficos** - Area charts, scatter plots
5. **Comparación de períodos** - Mes actual vs anterior
6. **Filtros avanzados** - Por vendedor, estado, producto
7. **Dashboard de reportes** - Vista combinada de todos los reportes
8. **Reportes personalizados** - Constructor de reportes
9. **Caché de datos** - Optimización de performance
10. **Reportes en tiempo real** - WebSocket para actualización live

---

## 📝 Notas Técnicas

- Queries optimizadas para PostgreSQL
- Formato de fechas: DD-MM-YYYY en backend
- Conversión automática desde YYYY-MM-DD (frontend)
- Todos los endpoints requieren JWT
- Los reportes se filtran por company_id automáticamente
- Los gráficos son responsivos (ResponsiveContainer)
- La impresión usa el motor nativo del navegador

---

## 🐛 Troubleshooting

### Error: "No hay datos para mostrar"
- Verificar que existan pedidos en el rango de fechas
- Revisar que los pedidos pertenezcan a la compañía del usuario

### Gráficos no se muestran
- Verificar que los datos tengan el formato correcto
- Revisar console para errores de Recharts

### Impresión no funciona
- Asegurarse de tener react-to-print instalado
- Verificar que printRef esté correctamente asignado

---

## 👨‍💻 Desarrollado Con

- **React** 18.3.1
- **Material-UI** 5.15.10
- **Recharts** 2.10.3
- **react-to-print** 2.15.1
- **Node.js/Express** (Backend)
- **PostgreSQL** (Database)
- **MobX** (State Management)
- **Moment.js** (Date Management)

---

## ✅ Checklist de Implementación

- [x] Servicios de reportes
- [x] Hook useReports
- [x] Componente PrintableReport
- [x] Vista ReportsView
- [x] ViewModel ReportsViewModel
- [x] Página Reports
- [x] Rutas frontend
- [x] Controladores backend
- [x] Rutas backend
- [x] Registro en server.js
- [x] Gráficos interactivos
- [x] Impresión funcional
- [x] Filtros de fecha
- [x] Resúmenes ejecutivos
- [x] Diseño responsivo

---

**Sistema de reportes completamente funcional e integrado!** 🎉
