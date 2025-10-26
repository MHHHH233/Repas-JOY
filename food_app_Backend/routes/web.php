<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Include user routes
Route::prefix('api/user')->group(function () {
    require __DIR__ . '/user/user.php';
});

// Include admin routes
Route::prefix('api')->group(function () {
    require __DIR__ . '/admin/admin.php';
});
