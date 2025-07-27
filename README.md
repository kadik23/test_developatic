# Laravel + Inertia.js + React + TypeScript + Ant Design + Tailwind CSS

This is a Laravel application with a modern frontend stack including Inertia.js, React, TypeScript, Ant Design, and Tailwind CSS.

## Features

- **Laravel 11** - Latest PHP framework
- **Inertia.js** - Build single-page apps without building an API
- **React 19** - Modern UI library
- **TypeScript** - Type safety for better development experience
- **Ant Design** - Enterprise UI design language and React UI library
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

- PHP 8.2+
- Node.js 20+
- Composer
- npm or yarn

## Installation

1. Clone the repository
2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Copy environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

## Development

1. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

2. In another terminal, start the Vite development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:8000` in your browser

## Building for Production

```bash
npm run build
```

## TypeScript

The project includes TypeScript support. You can run type checking with:

```bash
npm run type-check
```

## Project Structure

- `resources/js/Pages/` - React components (Inertia pages)
- `resources/js/app.tsx` - Main React application entry point
- `routes/web.php` - Laravel routes using Inertia
- `app/Http/Middleware/HandleInertiaRequests.php` - Inertia middleware

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

- **Backend**: Laravel 11, PHP 8.2+
- **Frontend**: React 19, TypeScript, Inertia.js
- **UI**: Ant Design, Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
