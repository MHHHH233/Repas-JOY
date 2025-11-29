<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\User\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public authentication routes
Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);

// Public contact route (no authentication required)
Route::post('contact', [ContactController::class, 'store']);

// Protected authentication routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);
    Route::get('profile', [AuthenticationController::class, 'profile']);
    Route::put('profile', [AuthenticationController::class, 'updateProfile']);
    Route::post('change-password', [AuthenticationController::class, 'changePassword']);
    Route::post('refresh', [AuthenticationController::class, 'refresh']);
});

// Test route
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is working!',
        'timestamp' => now()
    ]);
});
