<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    protected $tablename='outlets';
    protected $fillable=['name','location','phone','create_by','status'];
}
