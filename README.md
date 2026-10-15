# ClothingEcom

## Structure

- `frontend/Clothing-store` — React + TypeScript (Vite) app. Uses `better-auth/react` as the auth client.
- `backend/EcomApi` — ASP.NET Core (.NET 9) API. Connects to Postgres via EF Core / Npgsql.
- `backend/auth-service` — Node + TypeScript service running [Better Auth](https://www.better-auth.com), connected to the same Postgres database.
- `docker-compose.yml` — Postgres container shared by `EcomApi` and `auth-service`.

## First-time setup

1. Copy each `.env.example` to `.env` (root, `backend/auth-service`, `frontend/Clothing-store`) and adjust values if needed.
2. Start Postgres: `docker compose up -d`
   - The container publishes on host port **5433**, not 5432, to avoid colliding with any native Postgres install already running on your machine. If 5433 is also taken, set `POSTGRES_PORT` in the root `.env` and update the port in the other `.env` files / `appsettings.Development.json` to match.
3. Install dependencies:
   - `cd frontend/Clothing-store && npm install`
   - `cd backend/auth-service && npm install`
4. Generate and run Better Auth's database schema (creates its `user`/`session`/`account` tables):
   `cd backend/auth-service && npx auth migrate`

## Running

- Auth service: `cd backend/auth-service && npm run dev` (http://localhost:3001)
- API: `cd backend/EcomApi && dotnet run` (http://localhost:5267)
- Frontend: `cd frontend/Clothing-store && npm run dev` (http://localhost:5173)
