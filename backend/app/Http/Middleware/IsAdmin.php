<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Vérifie si l'utilisateur est authentifié et a le rôle "admin"
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403); // Si l'utilisateur n'est pas admin
        }

        return $next($request);
    }
}

