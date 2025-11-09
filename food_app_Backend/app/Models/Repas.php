<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repas extends Model
{
    protected $fillable = [
        'name',
        'description',
        'vegan',
        'onView',
        'qte',
        'id_category',
        'imgs_urls'
    ];

    protected $casts = [
        'vegan' => 'boolean',
        'onView' => 'boolean',
        'qte' => 'integer',
        'imgs_urls' => 'array'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_repas');
    }
}
