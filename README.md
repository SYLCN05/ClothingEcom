# ClothingEcom

## Structure

- `frontend/Clothing-store` — React + TypeScript (Vite) app.
- `backend/EcomApi` — ASP.NET Core (.NET 9) API. Connects to Postgres via EF Core / Npgsql.
- `docker-compose.yml` — Postgres container used by `EcomApi`.

## First-time setup

1. Copy each `.env.example` to `.env` (root, `frontend/Clothing-store`) and adjust values if needed.
2. Start Postgres: `docker compose up -d`
   - The container publishes on host port **5433**, not 5432, to avoid colliding with any native Postgres install already running on your machine. If 5433 is also taken, set `POSTGRES_PORT` in the root `.env` and update the port in `appsettings.Development.json` to match.
3. Install dependencies:
   - `cd frontend/Clothing-store && npm install`

## Running

- API: `cd backend/EcomApi && dotnet run` (http://localhost:5267)
- Frontend: `cd frontend/Clothing-store && npm run dev` (http://localhost:5173)
