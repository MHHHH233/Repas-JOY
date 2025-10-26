<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'nom_user',
        'des',
        'stars'
    ];

    protected $casts = [
        'stars' => 'integer'
    ];
}
