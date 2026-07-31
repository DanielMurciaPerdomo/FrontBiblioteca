# Frontend — Sistema de Gestión de Biblioteca

Frontend de la aplicación de gestión de biblioteca: administración de usuarios, libros (con control de ejemplares disponibles) y préstamos. Consume la API del backend a través de un cliente HTTP configurado con `VITE_API_URL`.

## Tecnologías

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **React Router** (navegación SPA)
- **Bootstrap 5 + Bootstrap Icons** (vía CDN)
- **Axios** (cliente HTTP)
- **Docker + Nginx** (publicación y servidor estático)

## Requisitos previos

- **Docker** instalado (Docker Engine + Docker Compose).
- **Backend corriendo** en `http://localhost:8080/api` (o ajustar `VITE_API_URL`).

## Inicio rápido

```bash
git clone <repo-url>
cd FrontBiblioteca
docker compose up -d --build
```

Abrir <http://localhost:5173>.

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:8080/api` |

Se pasa como `ARG` en el build de Docker (build-time), por lo que si el backend no está en `localhost:8080`, construye con:

```bash
docker compose build --build-arg VITE_API_URL=http://MI_IP:8080/api
```

También se puede sobrescribir al ejecutar: `VITE_API_URL=http://MI_IP:8080/api docker compose up -d --build`.

Para desarrollo local sin Docker: copiar `.env.example` a `.env`, ajustar `VITE_API_URL` y ejecutar `npm install` + `npm run dev`.

## Estructura

- `Dockerfile` — build multi-stage (Node 20 Alpine → Nginx Alpine).
- `nginx.conf` — servidor Nginx con fallback SPA para React Router.
- `docker-compose.yml` — servicio `frontend` expuesto en el puerto `5173`.

## Nota

Este proyecto no incluye referencias ni marcas específicas de ninguna empresa u organización; es un entregable técnico genérico.
