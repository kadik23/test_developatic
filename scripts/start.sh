#!/bin/bash

echo "# Generating Laravel key..."
php artisan key:generate

echo "# Generating JWT secret..."
php artisan jwt:secret

echo "# Generating Scribe..."
php artisan scribe:generate

echo "# Linking storage..."
php artisan storage:link

echo "# Setting up database..."
# Clear file-based caches only
php artisan config:clear
php artisan route:clear
php artisan view:clear

# # Simple PostgreSQL reset - separate statements
# echo "# Resetting database completely..."
# php artisan tinker --execute="DB::statement('DROP SCHEMA public CASCADE');" || true
# php artisan tinker --execute="DB::statement('CREATE SCHEMA public');" || true

# # Reconnect to database to clear aborted transaction state
# echo "# Reconnecting to database..."
# php artisan tinker --execute="DB::disconnect(); DB::reconnect();" || true

# # Run migrations without transactions
# echo "# Running migrations..."
# php artisan migrate --force --no-interaction

# # Seed the database
# echo "# Seeding database..."
# php artisan db:seed --force

echo "# Building frontend assets..."
npm install
npm run build

echo "# Starting the PHP application..."
php artisan serve --host=0.0.0.0 --port=8000
