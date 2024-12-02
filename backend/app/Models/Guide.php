<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    protected $fillable = [
        'title',
        'description',
        'icon_image',
        'introduction',
        'author'
    ];

    public function steps()
    {
        return $this->hasMany(GuideStep::class)->orderBy('order');
    }
}
