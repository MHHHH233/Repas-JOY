<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\RepasController;
use App\Http\Controllers\User\CommandeController;
use App\Http\Controllers\User\ReviewController;
use App\Http\Controllers\User\LandingSectionController;
use App\Http\Controllers\User\SousCategoryController;
use App\Http\Controllers\User\SocialMediaController;

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

    // SousCategory routes
    Route::prefix('sous-categories')->group(function () {
        Route::get('/', [SousCategoryController::class, 'index']);
        Route::post('/', [SousCategoryController::class, 'store']);
        Route::get('/{id}', [SousCategoryController::class, 'show']);
        Route::put('/{id}', [SousCategoryController::class, 'update']);
        Route::delete('/{id}', [SousCategoryController::class, 'destroy']);
        Route::get('/category/{categoryId}', [SousCategoryController::class, 'getByCategory']);
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

    // LandingSection routes
    Route::prefix('landing-sections')->group(function () {
        Route::get('/', [LandingSectionController::class, 'index']);
        Route::post('/', [LandingSectionController::class, 'store']);
        Route::get('/active', [LandingSectionController::class, 'active']);
        Route::get('/{id}', [LandingSectionController::class, 'show']);
        Route::put('/{id}', [LandingSectionController::class, 'update']);
        Route::delete('/{id}', [LandingSectionController::class, 'destroy']);
    });

    // SocialMedia routes
    Route::prefix('social-media')->group(function () {
        Route::get('/', [SocialMediaController::class, 'index']);
        Route::post('/', [SocialMediaController::class, 'store']);
        Route::get('/{id}', [SocialMediaController::class, 'show']);
        Route::put('/{id}', [SocialMediaController::class, 'update']);
        Route::delete('/{id}', [SocialMediaController::class, 'destroy']);
    });
});
