<?php

namespace App\Http\Controllers\Backend\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Request\Backend\Authentication\LoginRequest;
use App\Http\Request\Backend\Authentication\RegisterRequest;
use App\Services\Backend\Authentication\AuthService;
use Illuminate\Http\Request;

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
        // return "logout resp backend";
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
}
