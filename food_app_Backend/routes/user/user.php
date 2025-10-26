<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\RepasController;
use App\Http\Controllers\User\CommandeController;
use App\Http\Controllers\User\ReviewController;

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
|
| Here are the routes for regular users. These routes are accessible
| to authenticated users with 'user' role.
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    
    // User management routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    // Category routes
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });

    // Repas routes
    Route::prefix('repas')->group(function () {
        Route::get('/', [RepasController::class, 'index']);
        Route::post('/', [RepasController::class, 'store']);
        Route::get('/{id}', [RepasController::class, 'show']);
        Route::put('/{id}', [RepasController::class, 'update']);
        Route::delete('/{id}', [RepasController::class, 'destroy']);
        Route::get('/category/{categoryId}', [RepasController::class, 'getByCategory']);
    });

    // Commande routes
    Route::prefix('commandes')->group(function () {
        Route::get('/', [CommandeController::class, 'index']);
        Route::post('/', [CommandeController::class, 'store']);
        Route::get('/{id}', [CommandeController::class, 'show']);
        Route::put('/{id}', [CommandeController::class, 'update']);
        Route::delete('/{id}', [CommandeController::class, 'destroy']);
        Route::get('/user/{userId}', [CommandeController::class, 'getByUser']);
    });

    // Review routes
    Route::prefix('reviews')->group(function () {
        Route::get('/', [ReviewController::class, 'index']);
        Route::post('/', [ReviewController::class, 'store']);
        Route::get('/{id}', [ReviewController::class, 'show']);
        Route::put('/{id}', [ReviewController::class, 'update']);
        Route::delete('/{id}', [ReviewController::class, 'destroy']);
    });
});
