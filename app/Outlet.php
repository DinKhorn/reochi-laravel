<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    protected $tablename = 'outlets';

    protected $fillable = [
        'name',
        'location',
        'phone',
        'image',
        'status'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? url($this->image) : url('/images/placeholder.png');
    }
}
