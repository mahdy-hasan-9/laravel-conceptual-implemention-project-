<?php

use App\Http\Controllers\Backend\Authentication\AuthenticationController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return response()->json([
        'message' => 'hello from laravel api',
        'status' => 200
    ]);
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthenticationController::class, 'register'])->middleware('throttle:6,1');
    Route::post('/login', [AuthenticationController::class, 'login'])->middleware('throttle:6,1');

    Route::middleware('auth:sanctum')->group(function () {

        Route::group(['prefix' => 'user'], function () {
            Route::get('/profile', [AuthenticationController::class, 'user']);
            Route::post('/logout', [AuthenticationController::class, 'logout']);
        });

    });
});
