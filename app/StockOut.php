<?php

namespace App;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class StockOut extends Model
{
    protected $tablename='stock_outs';
    protected $fillable=[
        'reference_no',
        'outlet_id',
        'location_id',
        'deliver_id',
        'salesman_id',
        'note',
        'created_by',
        'updated_by'
    ];

    public function outlet(){
        return $this->belongsTo(\App\Outlet::class,'outlet_id','id');
    }

    public function location(){
        return $this->belongsTo(\App\Branch::class,'location_id','id');
    }

    public function deliver(){
        return $this->belongsTo(\App\Supplier::class,'deliver_id','id');
    }

    public function salesman(){
        return $this->belongsTo(\App\Supplier::class,'supplier_id','id');
    }

    public function created_by(){
        return $this->belongsTo(\App\User::class,'created_by','id');
    }

    public function stock_out_detail(){
        return $this->hasMany(\App\StockOutDetail::class);
    }

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-Y');
    }
}
