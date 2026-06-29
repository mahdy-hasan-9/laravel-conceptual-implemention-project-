<?php

use App\Http\Controllers\Backend\Activity\ActivityController;
use App\Http\Controllers\Backend\Authentication\AuthenticationController;
use App\Http\Controllers\Backend\Book\BookController;
use App\Http\Controllers\Backend\Class\ClassController;
use App\Http\Controllers\Backend\Notification\NotificationController;
use App\Http\Controllers\Backend\Student\StudentController;
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
            Route::get('/profile', [AuthenticationController::class, 'user'])->middleware('role:admin|manager|staff|student');
            Route::put('/profile', [AuthenticationController::class, 'update']);
            Route::post('/logout', [AuthenticationController::class, 'logout']);
        });
    });
});


Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'student'], function () {
        Route::get('/class', [ClassController::class, 'classList']);
        Route::get('/activity', [ActivityController::class, 'activities']);
        Route::get('/books', [BookController::class, 'bookList']);
        Route::resource('rsc', StudentController::class);
    });

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
});
