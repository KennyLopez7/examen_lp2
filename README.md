# Vuelos Frontend (Angular 18)

> Repositorio: **LopezK.J** — trabajos del chat LPII

Frontend Angular 18 con componentes standalone y Tailwind CSS para el sistema de reservas de vuelos.

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalación

```bash
cd D:\lopez\vuelos_frontend
npm install
```

> Si npm install marca conflictos de versiones, usa:
> ```bash
> npm install --legacy-peer-deps
> ```

## Ejecutar

Asegúrate primero de que el backend esté corriendo en `http://localhost:8080`.

```bash
npm start
```

El navegador se abre en `http://localhost:4200`.

## Rutas

| Ruta                  | Descripción                              |
|-----------------------|------------------------------------------|
| `/dashboard`          | Resumen + accesos rápidos                |
| `/vuelos`             | Listado de vuelos (ordena por número/fecha) |
| `/equipajes`          | Tipos de equipaje y costo                |
| `/reservas`           | Reservas con boleta expandida            |
| `/reservas/nueva`     | Formulario para crear reserva            |
| `/reservas/buscar`    | Buscar por documento + número de vuelo   |

## Estructura

```
src/
├── app/        # bootstrap, rutas, config
├── core/       # services, models, interceptors, guards
├── layout/     # navbar, sidebar, footer, main-layout
├── pages/      # 6 páginas
├── shared/     # components, pipes, directives
├── assets/
└── environments/
```

## Cambiar URL del backend

Edita `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
};
```

## Build de producción

```bash
npm run build
# Output en dist/vuelos-frontend
```

## Probar la API

En `docs/Vuelos-API.postman_collection.json` hay una colección Postman lista para importar con todos los endpoints documentados (listar/crear reservas, buscar GET y POST, equipajes, vuelos).
