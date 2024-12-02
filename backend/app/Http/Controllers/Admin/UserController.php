<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Afficher le formulaire pour créer un nouvel utilisateur
    public function create()
    {
        return view('admin.users.create');
    }

    // Enregistrer un nouvel utilisateur avec un user_name et un mot de passe
    public function store(Request $request)
    {
        // Validate only the required fields
        $validated = $request->validate([
            'user_name' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,editor,viewer'
        ]);

        try {
            // Create new user with only the required fields
            $user = User::create([
                'user_name' => $validated['user_name'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role']
            ]);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
