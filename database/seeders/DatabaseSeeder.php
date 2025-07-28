<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@something.com',
            'password' => Hash::make('password'),
            'user_type' => 'ADMIN',
            'date_of_birth' => '1990-01-01',
        ]);

        // Create some test users
        User::factory(50)->create([
            'user_type' => 'STANDARD',
        ]);
    }
}
