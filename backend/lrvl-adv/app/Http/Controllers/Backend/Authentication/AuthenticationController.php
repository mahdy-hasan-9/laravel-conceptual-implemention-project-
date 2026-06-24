<?php

namespace App\Http\Controllers\Backend\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Request\Backend\Authentication\LoginRequest;
use App\Http\Request\Backend\Authentication\RegisterRequest;
use App\Models\User;
use App\Services\Backend\Authentication\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;

class AuthenticationController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return response()->json($result, $result['status']);
    }

    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        return response()->json($result, $result['status']);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Logged out successfully.'
        ], 200);
    }

    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'status' => 200,
            'data' => $request->user(),
            'message' => 'User profile retrieved successfully.'
        ], 200);
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|integer',
                'name' => 'sometimes|string',
                'role' => 'sometimes|string',
                'is_active' => 'sometimes',
            ]);

            $user = User::findOrFail($request->input('id'));
            // Exclude both possible field names
            $data = $request->except(['avatar', 'avatar_removed', 'image_url', 'image_removed']);

            // Handle avatar/image removal
            if ($request->boolean('avatar_removed') || $request->boolean('image_removed')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $data['avatar'] = null;
            }

            // Handle new image upload - check for actual file
            if ($request->hasFile('avatar') || $request->hasFile('image')) {
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $file = $request->file('avatar') ?? $request->file('image');
                $data['avatar'] = $file->store('avatars', 'public');
            }

            $user->update($data);

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
