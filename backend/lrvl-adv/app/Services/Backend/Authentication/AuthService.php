<?php

namespace App\Services\Backend\Authentication;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Exception;

class AuthService
{
    public function register(array $data)
    {
        if (User::where('email', $data['email'])->exists()) {
            return [
                'success' => false,
                'status' => 422,
                'message' => 'Email already registered.'
            ];
        }
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_active' => 1,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'success' => true,
            'status' => 201,
            'token' => $token,
            'message' => 'User registered successfully.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]
        ];
    }

    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return [
                'success' => false,
                'status' => 401,
                'message' => 'Invalid credentials.'
            ];
        }
        if (!$user->is_active) {
            return [
                'success' => false,
                'status' => 403,
                'message' => 'Your account is inactive.'
            ];
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'success' => true,
            'status' => 200,
            'token' => $token,
            'message' => 'Login successful.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]
        ];
    }

    public function logout(User $user)
    {
        $user->tokens()->delete();
        return [
            'success' => true,
            'status' => 200,
            'message' => 'Logout successful.',
        ];
    }

    public function update(int $id, array $data): array
    {
        try {
            $user = User::findOrFail($id);
            
            $updateData = array_diff_key($data, array_flip(['avatar', 'avatar_removed', 'image_url', 'image_removed']));

            if (request()->boolean('avatar_removed') || request()->boolean('image_removed')) {
                if ($user->image_url) {
                    Storage::disk('public')->delete($user->image_url);
                }
                $updateData['image_url'] = null;
            }

            if (request()->hasFile('avatar') || request()->hasFile('image')) {
                if ($user->image_url) {
                    Storage::disk('public')->delete($user->image_url);
                }
                $file = request()->file('avatar') ?? request()->file('image');
                $updateData['image_url'] = $file->store('avatars', 'public');
            }

            $user->update($updateData);

            return [
                'success' => true,
                'status' => 200,
                'message' => 'User profile updated successfully.',
                'data' => ['user' => $user]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'status' => 500,
                'message' => 'Failed to update user profile: ' . $e->getMessage(),
            ];
        }
    }
}
