<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Afficher le formulaire pour créer un nouvel utilisateur
    public function create()
    {
        return view('admin.users.create');
    }

    public function index()
    {
        try {
            $currentUser = Auth::user();
            $query = User::select('id', 'user_name as name', 'role');

            // If admin, only show users
            if ($currentUser->role === 'admin') {
                $query->where('role', 'user');
            }
            // If super_admin, show all users
            // If user, show no users (should be blocked by middleware)

            $users = $query->get();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Enregistrer un nouvel utilisateur avec un user_name et un mot de passe
    public function store(Request $request)
    {
        $currentUser = Auth::user();
        
        // Determine allowed roles based on current user's role
        $allowedRoles = ['user'];
        if ($currentUser->role === 'admin') {
            $allowedRoles = ['user'];
        } elseif ($currentUser->role === 'super_admin') {
            $allowedRoles = ['admin', 'user'];
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|in:' . implode(',', $allowedRoles),
            'password' => 'required|string|min:6'
        ]);

        try {
            $user = User::create([
                'user_name' => $validated['name'],
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

    public function update(Request $request, $id)
    {
        $currentUser = Auth::user();
        $targetUser = User::findOrFail($id);

        // Check permissions
        if ($currentUser->role === 'admin' && $targetUser->role !== 'user') {
            return response()->json([
                'message' => 'Unauthorized to modify this user'
            ], 403);
        }

        // Determine allowed roles based on current user's role
        $allowedRoles = ['user'];
        if ($currentUser->role === 'admin') {
            $allowedRoles = ['user'];
        } elseif ($currentUser->role === 'super_admin') {
            $allowedRoles = ['admin', 'user'];
        }

        $validationRules = [
            'name' => 'required|string|max:255',
            'role' => 'required|string|in:' . implode(',', $allowedRoles)
        ];

        // Only validate password if it's provided
        if ($request->has('password')) {
            $validationRules['password'] = 'string|min:6';
        }

        $validated = $request->validate($validationRules);

        try {
            $targetUser->user_name = $validated['name'];
            $targetUser->role = $validated['role'];
            
            if (isset($validated['password'])) {
                $targetUser->password = Hash::make($validated['password']);
            }
            
            $targetUser->save();

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $targetUser
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $currentUser = Auth::user();
            
            // Only super_admin can delete users
            if ($currentUser->role !== 'super_admin') {
                return response()->json([
                    'message' => 'Unauthorized. Only super administrators can delete users.'
                ], 403);
            }

            $targetUser = User::findOrFail($id);

            // Prevent super_admin from deleting themselves
            if ($targetUser->id === $currentUser->id) {
                return response()->json([
                    'message' => 'Cannot delete your own account'
                ], 403);
            }

            $targetUser->delete();

            return response()->json([
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
