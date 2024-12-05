<?php

use App\Http\Controllers\AuthControllers;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActualiteController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\GuideController;
use App\Http\Middleware\IsAdmin;

// Route protégée pour récupérer l'utilisateur authentifié
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
Route::post('/register', [AuthControllers::class, 'register']);
Route::post('/login', [AuthControllers::class, 'login']);

// Public routes for reading actualities
Route::get('actualites', [ActualiteController::class, 'index']);
Route::get('actualites/{id}', [ActualiteController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('actualites', [ActualiteController::class, 'store']);
    Route::put('actualites/{id}', [ActualiteController::class, 'update']);
    Route::delete('actualites/{id}', [ActualiteController::class, 'destroy']);
    Route::put('clients/{id}', [ClientController::class, 'update']); 
    Route::post('clients', [ClientController::class, 'store']); 
    Route::delete('clients/{id}', [ClientController::class, 'destroy']);
    Route::middleware('isAdmin')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        Route::put('/user/{user}', [AuthControllers::class, 'update']);
    });
});

// Public client creation endpoint


Route::prefix('clients')->group(function () {
    Route::post('/public', [ClientController::class, 'storePublic']);
    Route::get('/', [ClientController::class, 'index']);       // Get all clients
    Route::get('/{id}', [ClientController::class, 'show']);    // Get a single client
     // Update a client
     // Delete a client
});

Route::post('/send-email', [EmailController::class, 'sendEmail']);

Route::apiResource('guides', GuideController::class);
