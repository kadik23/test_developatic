<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user first
        User::create([
            'name' => 'Admin',
            'email' => 'admin@something.com',
            'password' => bcrypt('password'),
            'date_of_birth' => '1980-01-01',
            'user_type' => 'ADMIN',
        ]);

        User::factory(1000)->create();
    }
}
