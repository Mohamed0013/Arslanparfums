# Perfume Shop — Laravel + React

Local development setup without Docker.

## Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 20
- MySQL >= 8.0 (already installed and configured for this project)

## Database (Already Configured)

The local MySQL database and user are already set up:

- Database: `house_market`
- User: `laravel` / `laravel`
- Host: `127.0.0.1:3306`

If you need to recreate them manually:

```sql
CREATE DATABASE house_market;
CREATE USER 'laravel'@'localhost' IDENTIFIED BY 'laravel';
GRANT ALL PRIVILEGES ON house_market.* TO 'laravel'@'localhost';
FLUSH PRIVILEGES;
```

## Backend

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend runs at: **http://localhost:8000**

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5174**

## Running Together

Start the backend in one terminal:

```bash
cd backend
php artisan serve
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

## Environment Variables

### Backend (`backend/.env`)

```env
APP_URL=http://localhost
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=house_market
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=/api
```

The Vite dev server proxies `/api` requests to the Laravel backend automatically.

## Notes

- `php artisan serve` uses Laravel's built-in development server. No Nginx required.
- If you need to change the backend port, update both `APP_URL` in `backend/.env` and `VITE_PROXY_TARGET` in `frontend/.env`.
