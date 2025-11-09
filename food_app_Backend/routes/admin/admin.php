<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminRepasController;
use App\Http\Controllers\Admin\AdminCommandeController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminLandingSectionController;
use App\Http\Controllers\Admin\AdminSousCategoryController;
use App\Http\Controllers\Admin\AdminSocialMediaController;

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

    // Admin SocialMedia routes
    Route::prefix('admin/social-media')->group(function () {
        Route::get('/', [AdminSocialMediaController::class, 'index']);
        Route::post('/', [AdminSocialMediaController::class, 'store']);
        Route::get('/{id}', [AdminSocialMediaController::class, 'show']);
        Route::put('/{id}', [AdminSocialMediaController::class, 'update']);
        Route::delete('/{id}', [AdminSocialMediaController::class, 'destroy']);
        Route::get('/stats/overview', [AdminSocialMediaController::class, 'getStats']);
    });

    // Admin Dashboard routes
    Route::prefix('admin/dashboard')->group(function () {
        Route::get('/overview', function () {
            $now = now();
            $last7Days = $now->copy()->subDays(7);
            $last30Days = $now->copy()->subDays(30);
            $last90Days = $now->copy()->subDays(90);
            
            // Basic counts
            $totalUsers = \App\Models\User::count();
            $totalCategories = \App\Models\Category::count();
            $totalRepas = \App\Models\Repas::count();
            $totalCommandes = \App\Models\Commande::count();
            $totalReviews = \App\Models\Review::count();
            $totalSousCategories = \App\Models\SousCategory::count();
            
            // User statistics
            $adminUsers = \App\Models\User::where('role', 'admin')->count();
            $regularUsers = \App\Models\User::where('role', 'user')->count();
            $newUsersLast7Days = \App\Models\User::where('created_at', '>=', $last7Days)->count();
            $newUsersLast30Days = \App\Models\User::where('created_at', '>=', $last30Days)->count();
            
            // Category statistics
            $categoriesWithRepas = \App\Models\Category::has('repas')->count();
            $categoriesWithSousCategories = \App\Models\Category::has('sousCategories')->count();
            
            // Repas statistics
            $visibleRepas = \App\Models\Repas::where('onView', true)->count();
            $hiddenRepas = \App\Models\Repas::where('onView', false)->count();
            $veganRepas = \App\Models\Repas::where('vegan', true)->count();
            $nonVeganRepas = \App\Models\Repas::where('vegan', false)->count();
            $repasInStock = \App\Models\Repas::where('qte', '>', 0)->count();
            $repasOutOfStock = \App\Models\Repas::where('qte', '<=', 0)->count();
            $newRepasLast7Days = \App\Models\Repas::where('created_at', '>=', $last7Days)->count();
            $newRepasLast30Days = \App\Models\Repas::where('created_at', '>=', $last30Days)->count();
            
            // Commande statistics
            $commandesLast7Days = \App\Models\Commande::where('created_at', '>=', $last7Days)->count();
            $commandesLast30Days = \App\Models\Commande::where('created_at', '>=', $last30Days)->count();
            $commandesLast90Days = \App\Models\Commande::where('created_at', '>=', $last90Days)->count();
            $commandesWithUsers = \App\Models\Commande::whereNotNull('id_user')->count();
            $commandesWithoutUsers = \App\Models\Commande::whereNull('id_user')->count();
            
            // Review statistics
            $averageRating = \App\Models\Review::avg('stars');
            $reviewsLast7Days = \App\Models\Review::where('created_at', '>=', $last7Days)->count();
            $reviewsLast30Days = \App\Models\Review::where('created_at', '>=', $last30Days)->count();
            $ratingDistribution = [
                '5_stars' => \App\Models\Review::where('stars', 5)->count(),
                '4_stars' => \App\Models\Review::where('stars', 4)->count(),
                '3_stars' => \App\Models\Review::where('stars', 3)->count(),
                '2_stars' => \App\Models\Review::where('stars', 2)->count(),
                '1_star' => \App\Models\Review::where('stars', 1)->count(),
                '0_stars' => \App\Models\Review::where('stars', 0)->count(),
            ];
            
            // Category distribution (repas per category)
            $categoryDistribution = \App\Models\Category::withCount('repas')
                ->orderBy('repas_count', 'desc')
                ->get()
                ->map(function ($category) {
                    return [
                        'category_id' => $category->id,
                        'category_name' => $category->name,
                        'repas_count' => $category->repas_count,
                    ];
                });
            
            // Daily commandes for last 30 days (for line chart)
            $dailyCommandes = [];
            for ($i = 29; $i >= 0; $i--) {
                $date = $now->copy()->subDays($i)->startOfDay();
                $dailyCommandes[] = [
                    'date' => $date->format('Y-m-d'),
                    'count' => \App\Models\Commande::whereDate('created_at', $date)->count(),
                ];
            }
            
            // Weekly growth data
            $weeklyData = [];
            for ($i = 3; $i >= 0; $i--) {
                $weekStart = $now->copy()->subWeeks($i)->startOfWeek();
                $weekEnd = $weekStart->copy()->endOfWeek();
                $weeklyData[] = [
                    'week' => $weekStart->format('Y-m-d'),
                    'users' => \App\Models\User::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                    'repas' => \App\Models\Repas::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                    'commandes' => \App\Models\Commande::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                    'reviews' => \App\Models\Review::whereBetween('created_at', [$weekStart, $weekEnd])->count(),
                ];
            }
            
            // Recent activity (last 10 records)
            $recentUsers = \App\Models\User::latest()->take(5)->get(['id', 'username', 'role', 'created_at']);
            $recentCommandes = \App\Models\Commande::with(['user', 'repas'])
                ->latest()
                ->take(5)
                ->get(['id', 'id_user', 'id_repas', 'created_at']);
            $recentReviews = \App\Models\Review::latest()->take(5)->get(['id', 'nom_user', 'stars', 'created_at']);
            
            // Top repas by commandes
            $topRepas = \App\Models\Repas::withCount('commandes')
                ->orderBy('commandes_count', 'desc')
                ->take(10)
                ->get(['id', 'name', 'onView', 'qte'])
                ->map(function ($repas) {
                    return [
                        'id' => $repas->id,
                        'name' => $repas->name,
                        'commandes_count' => $repas->commandes_count,
                        'on_view' => $repas->onView,
                        'stock' => $repas->qte,
                    ];
                });
            
            return response()->json([
                'success' => true,
                'message' => 'Admin dashboard overview',
                'data' => [
                    // Basic totals
                    'totals' => [
                        'users' => $totalUsers,
                        'categories' => $totalCategories,
                        'repas' => $totalRepas,
                        'commandes' => $totalCommandes,
                        'reviews' => $totalReviews,
                        'sous_categories' => $totalSousCategories,
                    ],
                    
                    // User statistics
                    'users' => [
                        'total' => $totalUsers,
                        'admins' => $adminUsers,
                        'regular_users' => $regularUsers,
                        'new_last_7_days' => $newUsersLast7Days,
                        'new_last_30_days' => $newUsersLast30Days,
                        'growth_rate_7d' => $totalUsers > 0 ? round(($newUsersLast7Days / $totalUsers) * 100, 2) : 0,
                    ],
                    
                    // Category statistics
                    'categories' => [
                        'total' => $totalCategories,
                        'with_repas' => $categoriesWithRepas,
                        'with_sous_categories' => $categoriesWithSousCategories,
                        'distribution' => $categoryDistribution,
                    ],
                    
                    // Repas statistics
                    'repas' => [
                        'total' => $totalRepas,
                        'visible' => $visibleRepas,
                        'hidden' => $hiddenRepas,
                        'vegan' => $veganRepas,
                        'non_vegan' => $nonVeganRepas,
                        'in_stock' => $repasInStock,
                        'out_of_stock' => $repasOutOfStock,
                        'new_last_7_days' => $newRepasLast7Days,
                        'new_last_30_days' => $newRepasLast30Days,
                        'top_by_commandes' => $topRepas,
                    ],
                    
                    // Commande statistics
                    'commandes' => [
                        'total' => $totalCommandes,
                        'last_7_days' => $commandesLast7Days,
                        'last_30_days' => $commandesLast30Days,
                        'last_90_days' => $commandesLast90Days,
                        'with_users' => $commandesWithUsers,
                        'without_users' => $commandesWithoutUsers,
                        'daily_data' => $dailyCommandes, // For line chart
                    ],
                    
                    // Review statistics
                    'reviews' => [
                        'total' => $totalReviews,
                        'average_rating' => round($averageRating ?? 0, 2),
                        'last_7_days' => $reviewsLast7Days,
                        'last_30_days' => $reviewsLast30Days,
                        'rating_distribution' => $ratingDistribution,
                    ],
                    
                    // Growth trends (for charts)
                    'growth' => [
                        'weekly' => $weeklyData,
                    ],
                    
                    // Recent activity
                    'recent_activity' => [
                        'users' => $recentUsers,
                        'commandes' => $recentCommandes,
                        'reviews' => $recentReviews,
                    ],
                ]
            ]);
        });
    });
});
