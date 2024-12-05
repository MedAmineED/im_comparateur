<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\Request;

class AuthControllers extends Controller
{
    /**
     * Enregistrement d'un nouvel utilisateur.
     */
    public function register(Request $request)
    {
        // Updated validation rules to match new User model
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,editor,viewer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $user = User::create([
                'user_name' => $request->user_name,
                'password' => Hash::make($request->password),
                'role' => $request->role
            ]);

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error during registration',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $user = User::where('user_name', $request->user_name)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }

            // Create new token
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'user_name' => $user->user_name,
                    'role' => $user->role
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error during login',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mise à jour des informations d'un utilisateur.
     * Seuls les administrateurs peuvent mettre à jour un utilisateur.
     */
    public function update(Request $request, User $user)
    {
        // Vérifie si l'utilisateur actuel est un administrateur
        if (auth()->user()->isAdmin()) {
            // Validation des données entrantes
            $validator = Validator::make($request->all(), [
                'user_name' => 'sometimes|required|string|max:255', 
                'password' => 'sometimes|required|string|min:6|confirmed', 
                'role' => 'sometimes|required|string|in:admin,editor,viewer'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            // Mise à jour des informations de l'utilisateur
            if ($request->has('user_name')) {
                $user->user_name = $request->input('user_name'); 
            }

            // Si un mot de passe est fourni, il doit être haché avant la sauvegarde
            if ($request->has('password')) {
                $user->password = Hash::make($request->input('password')); 
            }

            if ($request->has('role')) {
                $user->role = $request->input('role'); 
            }

            // Sauvegarde des modifications
            $user->save();

            return response()->json([
                'success' => 'Admin user updated successfully',
                'user' => $user
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 403); 
        }
    }

    public function logout(Request $request)
    {
        try {
            // Revoke all tokens for the authenticated user
            $request->user()->tokens()->delete();
            
            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error during logout',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
