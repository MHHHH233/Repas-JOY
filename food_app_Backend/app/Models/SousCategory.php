<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SousCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'id_category'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }
}
