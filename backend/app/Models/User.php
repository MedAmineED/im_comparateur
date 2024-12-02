<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_name',
        'role',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Vérifie si l'utilisateur est un administrateur.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin'; // Si le rôle est 'admin', retourne true
    }

    // Relation avec les actualités : Un utilisateur peut avoir plusieurs actualités
    public function actualites()
    {
        return $this->hasMany(Actualite::class, 'user_id', 'id'); // Utilise 'user_id' comme clé étrangère
    }
}

