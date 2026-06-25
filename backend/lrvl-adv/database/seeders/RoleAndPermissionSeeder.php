<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'view-articles',
            'create-articles',
            'edit-articles',
            'delete-articles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $managerRole = Role::firstOrCreate(['name' => 'manager', 'guard_name' => 'web']);
        $staffRole = Role::firstOrCreate(['name' => 'staff', 'guard_name' => 'web']);
        $studentRole = Role::firstOrCreate(['name' => 'student', 'guard_name' => 'web']);

        $adminRole->syncPermissions(Permission::all());
        $managerRole->syncPermissions(['view-articles', 'create-articles', 'edit-articles']);
        $staffRole->syncPermissions(['view-articles', 'create-articles']);
        $studentRole->syncPermissions(['view-articles']);


        $admin = User::where('role', 'admin')->first();
        $admin->assignRole('admin');

        $manager = User::where('role', 'manager')->first();
        $manager->assignRole('manager');

        $staff = User::where('role', 'staff')->first();
        $staff->assignRole('staff');

        $students = User::where('role', 'student')->get();
        foreach ($students as $student) {
            $student->assignRole('student');
        }
    }
}
