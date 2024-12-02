<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Actualite extends Model
{
    // Indiquez les attributs qui peuvent être remplis
    protected $fillable = [
        'title',
        'content',
        'date_creation',
        'excerpt',
        'user_id', // Utilisation de 'user_id' pour la clé étrangère
        'image', // Add image to fillable attributes

    ];

    // Relation avec l'utilisateur : Une actualité appartient à un utilisateur
    public function utilisateur()
    {
        // Correction : 'user_id' comme clé étrangère
        return $this->belongsTo(User::class, 'user_id', 'id'); // Utilisation de 'user_id' comme clé étrangère
    }
}


