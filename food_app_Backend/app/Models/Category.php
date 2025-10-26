<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name'
    ];

    public function sousCategories()
    {
        return $this->hasMany(SousCategory::class, 'id_category');
    }

    public function repas()
    {
        return $this->hasMany(Repas::class, 'id_category');
    }
}
