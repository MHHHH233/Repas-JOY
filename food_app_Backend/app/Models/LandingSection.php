<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingSection extends Model
{
    protected $fillable = [
        'background_img',
        'title_text',
        'subtitle_text',
        'button_text',
        'button_link',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
}
