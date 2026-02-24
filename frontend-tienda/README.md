# Frontend Tienda - Angular

Sistema de gestión de tienda desarrollado en Angular con arquitectura en N capas.

## Arquitectura en N Capas

### 1. Capa de Presentación (Components)
- `components/categoria/` - Gestión de categorías
- `components/producto/` - Gestión de productos  
- `components/cliente/` - Gestión de clientes

### 2. Capa de Lógica de Negocio (Services)
- `services/categoria.service.ts` - Lógica de negocio para categorías
- `services/producto.service.ts` - Lógica de negocio para productos
- `services/cliente.service.ts` - Lógica de negocio para clientes

### 3. Capa de Acceso a Datos (Models)
- `models/categoria.model.ts` - Modelo de datos de categoría
- `models/producto.model.ts` - Modelo de datos de producto
- `models/cliente.model.ts` - Modelo de datos de cliente
- `models/venta.model.ts` - Modelo de datos de venta
- `models/usuario.model.ts` - Modelo de datos de usuario

### 4. Capa de Comunicación (HTTP)
- HttpClient de Angular para comunicación con el backend
- Configuración en `app.config.ts` con `provideHttpClient()`

## Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v21)

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
cd frontend-tienda
npm install
```

## Configuración

El backend debe estar ejecutándose en `http://localhost:8080`

Si necesitas cambiar la URL del backend, edita los archivos de servicios en `src/app/services/`

## Ejecución

```bash
cd frontend-tienda
npm start
```

O también:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
frontend-tienda/
├── src/
│   ├── app/
│   │   ├── components/          # Capa de Presentación
│   │   │   ├── categoria/
│   │   │   │   └── categoria-list.component.ts
│   │   │   ├── producto/
│   │   │   │   └── producto-list.component.ts
│   │   │   └── cliente/
│   │   │       └── cliente-list.component.ts
│   │   ├── services/            # Capa de Lógica de Negocio
│   │   │   ├── categoria.service.ts
│   │   │   ├── producto.service.ts
│   │   │   └── cliente.service.ts
│   │   ├── models/              # Capa de Acceso a Datos
│   │   │   ├── categoria.model.ts
│   │   │   ├── producto.model.ts
│   │   │   ├── cliente.model.ts
│   │   │   ├── venta.model.ts
│   │   │   └── usuario.model.ts
│   │   ├── app.ts               # Componente principal
│   │   ├── app.html             # Template principal
│   │   ├── app.css              # Estilos del componente principal
│   │   ├── app.routes.ts        # Configuración de rutas
│   │   └── app.config.ts        # Configuración de la aplicación
│   ├── index.html
│   ├── main.ts                  # Punto de entrada
│   └── styles.css               # Estilos globales
├── angular.json
├── package.json
└── tsconfig.json
```

## Funcionalidades

### Categorías
- Listar todas las categorías
- Crear nueva categoría
- Editar categoría existente
- Eliminar categoría

### Productos
- Listar todos los productos
- Crear nuevo producto
- Editar producto existente
- Eliminar producto
- Asociar producto con categoría

### Clientes
- Listar todos los clientes
- Crear nuevo cliente
- Editar cliente existente
- Eliminar cliente

## Tecnologías Utilizadas

- Angular 21 (Standalone Components)
- TypeScript
- RxJS
- HttpClient
- FormsModule
- RouterModule

## Notas

- La aplicación utiliza componentes standalone de Angular 21
- Lazy loading implementado para optimizar la carga
- Arquitectura modular y escalable
- Separación clara de responsabilidades por capas
- SSR (Server-Side Rendering) habilitado por defecto
