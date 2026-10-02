<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PerfumeController;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

Route::get('/register', fn () => response()->json([
    'message' => 'Method not allowed. Use POST /api/register.',
], 405));

Route::get('/login', fn () => response()->json([
    'message' => 'Method not allowed. Use POST /api/login.',
], 405));

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/perfumes', [PerfumeController::class, 'index']);
Route::get('/perfumes/{slug}', [PerfumeController::class, 'show']);

Route::post('/orders', [OrderController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | Admin-only routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('admin')->group(function () {
        Route::get('/admin/orders', [OrderController::class, 'index']);
        Route::patch('/admin/orders/{order}/validate', [OrderController::class, 'markAsValidated']);

        Route::get('/admin/perfumes', [\App\Http\Controllers\Admin\PerfumeController::class, 'index']);
        Route::post('/admin/perfumes', [\App\Http\Controllers\Admin\PerfumeController::class, 'store']);
        Route::patch('/admin/perfumes/{perfume}/stock', [\App\Http\Controllers\Admin\PerfumeController::class, 'updateStock']);
        Route::patch('/admin/perfumes/{perfume}', [\App\Http\Controllers\Admin\PerfumeController::class, 'update']);
        Route::delete('/admin/perfumes/{perfume}', [\App\Http\Controllers\Admin\PerfumeController::class, 'destroy']);
    });
});