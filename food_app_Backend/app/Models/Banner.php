<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'titre',
        'description',
        'type',
        'status',
        'button',
        'image',
        'rank'
    ];

    protected $casts = [
        'status' => 'string',
        'rank' => 'integer'
    ];
}
