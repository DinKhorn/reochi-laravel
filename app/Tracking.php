<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tracking extends Model
{
    protected $tablename='trackings';
    protected $fillable = [ 
            'user_id', 
            'latitude',
            'longtitude',
        ];

    public function user(){
        return $this->belongsTo(\App\User::class,'user_id');
    }
}
