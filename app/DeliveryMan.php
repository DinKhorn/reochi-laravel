<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DeliveryMan extends Model
{
    protected $table='delivery_men';
    protected $fillable=[
        'name',
        'email',
        'phone',
        'address'
    ];
}
