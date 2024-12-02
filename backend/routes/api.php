<?php

use App\Http\Controllers\AuthControllers;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActualiteController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\GuideController;

// Route protégée pour récupérer l'utilisateur authentifié
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route d'inscription pour les utilisateurs
Route::post('/register', [AuthControllers::class, 'register']);
Route::post('/login', [AuthControllers::class, 'login']); // Ajout de la route de login

// Routes de gestion des actualités
Route::apiResource('actualites', ActualiteController::class);
Route::apiResource('guides', GuideController::class);

// Public client creation endpoint
Route::post('/clients/public', [ClientController::class, 'storePublic']);

Route::prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index']);       // Get all clients
    Route::post('/', [ClientController::class, 'store']);      // Create a new client
    Route::get('/{id}', [ClientController::class, 'show']);    // Get a single client
    Route::put('/{id}', [ClientController::class, 'update']);  // Update a client
    Route::delete('/{id}', [ClientController::class, 'destroy']); // Delete a client
});

Route::post('/send-email', [EmailController::class, 'sendEmail']);

// Groupes de routes protégées par l'authentification
Route::middleware('auth:sanctum')->group(function () {
    // Route de mise à jour d'un utilisateur, seulement accessible par les admins
    Route::middleware('is_admin')->put('/user/{user}', [AuthControllers::class, 'update']);
});
