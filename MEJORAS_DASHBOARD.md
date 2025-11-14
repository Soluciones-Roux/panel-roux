# Mejoras al Dashboard - Panel Roux

## Resumen de Cambios

Se han implementado mejoras significativas al dashboard de HomeView, incluyendo la adición de filtros de fecha para consultar órdenes en rangos personalizados.

---

## 🎯 Funcionalidades Nuevas

### 1. **Filtro de Fechas**
- Componente visual con selector de rango de fechas
- Accesos rápidos para filtrar por:
  - Hoy
  - Últimos 7 días
  - Últimos 15 días
  - Últimos 30 días
- Botones para aplicar y limpiar filtros
- Diseño responsivo y consistente con Material-UI

---

## 📁 Archivos Modificados

### **Frontend (panel-roux)**

#### Nuevos Archivos:
1. **`src/components/core/DateRangeFilter.jsx`**
   - Componente de filtro de fechas reutilizable
   - Incluye accesos rápidos y validación de fechas
   - Interfaz Material-UI integrada

#### Archivos Modificados:

2. **`src/components/view/HomeView.jsx`**
   - Agregado import de `DateRangeFilter`
   - Agregadas props: `dateFilter`, `onFilterApply`, `onFilterClear`
   - Integración del componente de filtro en el layout

3. **`src/components/viewModel/HomeViewModel.jsx`**
   - Estado `dateFilter` para gestionar fechas seleccionadas
   - Función `loadOrdersWithFilter()` para cargar órdenes con parámetros
   - Funciones `handleFilterApply()` y `handleFilterClear()` para gestión de filtros
   - Conversión de formato de fecha (YYYY-MM-DD → DD-MM-YYYY)

4. **`src/components/services/OrderStandarService.js`**
   - Actualizado `fetchMyOrdersStandarService()` para aceptar parámetros
   - Soporte para enviar `startDate` y `endDate` como query params

5. **`src/components/services/OrderExpressService.js`**
   - Actualizado `fetchMyOrdersExpressService()` para aceptar parámetros
   - Soporte para enviar `startDate` y `endDate` como query params

6. **`src/components/store/OrderStandardStore.js`**
   - Método `getMyOrderStandar()` actualizado para recibir params
   - Método `markCompleteOrderStandar()` actualizado para mantener filtros

7. **`src/components/store/OrderExpressStore.js`**
   - Método `getMyOrdersExpress()` actualizado para recibir params

8. **`src/components/store/logic/OrderStandarLogic.js`**
   - Función `fetchMyOrderStandar()` actualizada para pasar params al servicio

9. **`src/components/store/logic/OrderExpressLogic.js`**
   - Función `fetchMyOrdersExpressLogic()` actualizada para pasar params al servicio

---

### **Backend (api-roux)**

#### Archivos Modificados:

1. **`src/controllers/orders/index.js`**
   - **`getSellerOrdersWeb()`**: Modificado para leer `startDate` y `endDate` desde `req.query` (en lugar de `req.body`)
   - Mantiene filtro de fecha con formato DD-MM-YYYY
   - Mejorado log de consola

2. **`src/controllers/quick_orders/index.js`**
   - **`getQuickOrdersWeb()`**: Modificado para leer `startDate` y `endDate` desde `req.query`
   - Mantiene filtro de fecha con formato DD-MM-YYYY
   - Corregido parámetro de companyId en query
   - Mejorado log de consola

---

## 🔄 Flujo de Datos

### Filtrado de Órdenes:

```
Usuario selecciona fechas en DateRangeFilter
         ↓
HomeViewModel.handleFilterApply()
         ↓
Convierte YYYY-MM-DD → DD-MM-YYYY
         ↓
loadOrdersWithFilter(params)
         ↓
├─→ getMyOrderStandar(token, params)
│        ↓
│   OrderStandardStore.getMyOrderStandar()
│        ↓
│   fetchMyOrderStandar(token, params)
│        ↓
│   fetchMyOrdersStandarService(token, params)
│        ↓
│   GET /private/api/orders/my-orders-web?startDate=...&endDate=...
│
└─→ getMyOrdersExpress(token, params)
         ↓
    OrderExpressStore.getMyOrdersExpress()
         ↓
    fetchMyOrdersExpressLogic(token, params)
         ↓
    fetchMyOrdersExpressService(token, params)
         ↓
    GET /private/api/quick-orders/web?startDate=...&endDate=...
```

---

## 🎨 Interfaz de Usuario

### Componente DateRangeFilter

El nuevo componente incluye:

- **Campos de Fecha**: Input tipo date para inicio y fin
- **Botón "Aplicar Filtro"**: Ejecuta la consulta con las fechas seleccionadas
- **Botón "Limpiar"**: Resetea a las fechas del día actual
- **Chips de Acceso Rápido**: 
  - Hoy
  - Últimos 7 días
  - Últimos 15 días  
  - Últimos 30 días

### Validaciones

- No permite que la fecha de inicio sea mayor que la fecha final
- Muestra alerta en caso de rango inválido
- Valores por defecto: fecha actual

---

## 🔧 Formato de Fechas

### Frontend
- **Input del usuario**: `YYYY-MM-DD` (formato nativo de `<input type="date">`)
- **Envío al backend**: `DD-MM-YYYY` (conversión con moment.js)

### Backend
- **Recepción**: `DD-MM-YYYY` desde query params
- **Comparación SQL**: `to_char(o.created_at, 'DD-MM-YYYY') BETWEEN $2 AND $3`

---

## 📊 Endpoints Actualizados

### 1. GET /private/api/orders/my-orders-web
**Query Params:**
- `startDate` (opcional): Fecha inicio en formato DD-MM-YYYY
- `endDate` (opcional): Fecha fin en formato DD-MM-YYYY

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "created_at": "2024-01-15T10:30:00Z",
      "seller_name": "Juan Pérez",
      "customer_name": "Cliente ABC",
      "total": 1500.50,
      "status_name": "Completado",
      "items": [...]
    }
  ]
}
```

### 2. GET /private/api/quick-orders/web
**Query Params:**
- `startDate` (opcional): Fecha inicio en formato DD-MM-YYYY
- `endDate` (opcional): Fecha fin en formato DD-MM-YYYY

**Respuesta:**
```json
{
  "success": true,
  "ordersExpress": [
    {
      "id": 1,
      "created_at": "2024-01-15T10:30:00Z",
      "seller_name": "Juan Pérez",
      "client_info": "Cliente XYZ",
      "total": 850.00,
      "status_name": "Pendiente"
    }
  ]
}
```

---

## ✅ Mejoras Implementadas

1. ✅ Filtro de fechas visual y funcional
2. ✅ Accesos rápidos para rangos comunes
3. ✅ Integración con backend mediante query params
4. ✅ Soporte para órdenes estándar y express
5. ✅ Validación de rangos de fecha
6. ✅ Conversión automática de formatos
7. ✅ Diseño responsivo y consistente
8. ✅ Actualización automática de estadísticas

---

## 🚀 Uso

### Para Aplicar Filtros:
1. Seleccionar fecha de inicio y fecha de fin
2. Hacer clic en "Aplicar Filtro"
3. El dashboard se actualiza con los datos filtrados

### Para Usar Accesos Rápidos:
1. Hacer clic en cualquier chip (Hoy, 7 días, 15 días, 30 días)
2. El filtro se aplica automáticamente

### Para Limpiar Filtros:
1. Hacer clic en "Limpiar"
2. Se restablece al día actual

---

## 🧪 Pruebas Recomendadas

1. **Filtro por fecha específica**: Seleccionar un rango y verificar resultados
2. **Accesos rápidos**: Probar cada chip de acceso rápido
3. **Validación**: Intentar fecha inicio > fecha fin
4. **Limpiar**: Verificar que resetea correctamente
5. **Sin resultados**: Probar con fechas sin datos
6. **Completar orden**: Verificar que mantiene filtros después de completar

---

## 📝 Notas Técnicas

- Se utiliza **Moment.js** para manejo de fechas
- Los filtros se mantienen en el estado local del ViewModel
- Los parámetros se envían como **query params** en peticiones GET
- El backend utiliza **PostgreSQL** con función `to_char()` para comparación
- Arquitectura **MVVM** mantenida en el frontend
- **MobX** utilizado para gestión de estado

---

## 🔮 Mejoras Futuras Sugeridas

1. Guardar el último filtro aplicado en localStorage
2. Agregar exportación de datos filtrados a CSV/Excel
3. Visualización gráfica de estadísticas por rango de fechas
4. Comparación de períodos (ej: mes actual vs mes anterior)
5. Filtros adicionales: vendedor, estado, cliente
6. Paginación para grandes volúmenes de datos

---

## 👨‍💻 Autor
Desarrollado siguiendo las mejores prácticas de React, MobX y Node.js/Express.
