<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'id_user',
        'id_repas',
        'address',
        'name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function repas()
    {
        return $this->belongsTo(Repas::class, 'id_repas');
    }
}
