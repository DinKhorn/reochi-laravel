<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    protected $fillable = [
        'code', 'reward', 'description', 'status', 'exchanged'
    ];
}
