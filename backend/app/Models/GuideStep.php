<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuideStep extends Model
{
    protected $fillable = [
        'guide_id',
        'title',
        'content',
        'order'
    ];

    public function guide()
    {
        return $this->belongsTo(Guide::class);
    }
}
