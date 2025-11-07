<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminRepasController;
use App\Http\Controllers\Admin\AdminCommandeController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminLandingSectionController;
use App\Http\Controllers\Admin\AdminSousCategoryController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here are the routes for admin users. These routes are accessible
| only to authenticated users with 'admin' role.
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    
    // Admin User management routes
    Route::prefix('admin/users')->group(function () {
        Route::get('/', [AdminUserController::class, 'index']);
        Route::post('/', [AdminUserController::class, 'store']);
        Route::get('/{id}', [AdminUserController::class, 'show']);
        Route::put('/{id}', [AdminUserController::class, 'update']);
        Route::delete('/{id}', [AdminUserController::class, 'destroy']);
        Route::get('/stats/overview', [AdminUserController::class, 'getStats']);
    });

    // Admin Category routes
    Route::prefix('admin/categories')->group(function () {
        Route::get('/', [AdminCategoryController::class, 'index']);
        Route::post('/', [AdminCategoryController::class, 'store']);
        Route::get('/{id}', [AdminCategoryController::class, 'show']);
        Route::put('/{id}', [AdminCategoryController::class, 'update']);
        Route::delete('/{id}', [AdminCategoryController::class, 'destroy']);
        Route::get('/stats/overview', [AdminCategoryController::class, 'getStats']);
    });

    // Admin Repas routes
    Route::prefix('admin/repas')->group(function () {
        Route::get('/', [AdminRepasController::class, 'index']);
        Route::post('/', [AdminRepasController::class, 'store']);
        Route::get('/{id}', [AdminRepasController::class, 'show']);
        Route::put('/{id}', [AdminRepasController::class, 'update']);
        Route::delete('/{id}', [AdminRepasController::class, 'destroy']);
        Route::get('/stats/overview', [AdminRepasController::class, 'getStats']);
        Route::post('/{id}/toggle-visibility', [AdminRepasController::class, 'toggleVisibility']);
    });

    // Admin Commande routes
    Route::prefix('admin/commandes')->group(function () {
        Route::get('/', [AdminCommandeController::class, 'index']);
        Route::post('/', [AdminCommandeController::class, 'store']);
        Route::get('/{id}', [AdminCommandeController::class, 'show']);
        Route::put('/{id}', [AdminCommandeController::class, 'update']);
        Route::delete('/{id}', [AdminCommandeController::class, 'destroy']);
        Route::get('/stats/overview', [AdminCommandeController::class, 'getStats']);
    });

    // Admin Review routes
    Route::prefix('admin/reviews')->group(function () {
        Route::get('/', [AdminReviewController::class, 'index']);
        Route::post('/', [AdminReviewController::class, 'store']);
        Route::get('/{id}', [AdminReviewController::class, 'show']);
        Route::put('/{id}', [AdminReviewController::class, 'update']);
        Route::delete('/{id}', [AdminReviewController::class, 'destroy']);
        Route::get('/stats/overview', [AdminReviewController::class, 'getStats']);
    });

    // Admin LandingSection routes
    Route::prefix('admin/landing-sections')->group(function () {
        Route::get('/', [AdminLandingSectionController::class, 'index']);
        Route::post('/', [AdminLandingSectionController::class, 'store']);
        Route::get('/{id}', [AdminLandingSectionController::class, 'show']);
        Route::put('/{id}', [AdminLandingSectionController::class, 'update']);
        Route::delete('/{id}', [AdminLandingSectionController::class, 'destroy']);
        Route::get('/stats/overview', [AdminLandingSectionController::class, 'getStats']);
    });

    // Admin SousCategory routes
    Route::prefix('admin/sous-categories')->group(function () {
        Route::get('/', [AdminSousCategoryController::class, 'index']);
        Route::post('/', [AdminSousCategoryController::class, 'store']);
        Route::get('/{id}', [AdminSousCategoryController::class, 'show']);
        Route::put('/{id}', [AdminSousCategoryController::class, 'update']);
        Route::delete('/{id}', [AdminSousCategoryController::class, 'destroy']);
        Route::get('/stats/overview', [AdminSousCategoryController::class, 'getStats']);
    });

    // Admin Dashboard routes
    Route::prefix('admin/dashboard')->group(function () {
        Route::get('/overview', function () {
            return response()->json([
                'success' => true,
                'message' => 'Admin dashboard overview',
                'data' => [
                    'total_users' => \App\Models\User::count(),
                    'total_categories' => \App\Models\Category::count(),
                    'total_repas' => \App\Models\Repas::count(),
                    'total_commandes' => \App\Models\Commande::count(),
                    'total_reviews' => \App\Models\Review::count()
                ]
            ]);
        });
    });
});
