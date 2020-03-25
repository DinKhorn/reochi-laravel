<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Salesman extends Model
{
    protected $table='salesman';
    protected $fillable=[
        'name',
        'email',
        'phone',
        'address'
    ];
}
