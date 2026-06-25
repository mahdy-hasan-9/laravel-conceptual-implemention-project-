<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => "Admin",
            'email' => "admin@gmail.com",
            'password' => Hash::make('Password8'),
            'is_active' => 1,
            'role' => 'admin'
        ]);
        User::create([
            'name' => "Manager",
            'email' => "manager@gmail.com",
            'password' => Hash::make('Password8'),
            'is_active' => 1,
            'role' => 'manager'
        ]);
        User::create([
            'name' => "Staff",
            'email' => "staff@gmail.com",
            'password' => Hash::make('Password8'),
            'is_active' => 1,
            'role' => 'staff'
        ]);

        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "Student $i",
                'email' => "student$i@gmail.com",
                'password' => Hash::make('Password8'),
                'is_active' => 1,
                'role' => 'student'
            ]);
        }
    }
}
