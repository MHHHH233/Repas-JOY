<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $fillable = [
        'logo',
        'instagram',
        'facebook',
        'x',
        'urls_for_local',
        'email',
        'phone',
        'tiktok'
    ];

    protected $casts = [
        'urls_for_local' => 'array'
    ];
}
