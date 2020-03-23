<?php

namespace App;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class StockIn extends Model
{
    protected $tablename='stock_ins';
    protected $fillable=[
        'reference_no',
        'supplier_id',
        'product_id',
        'note',
        'created_by',
        'updated_by'
    ];

    public function stock_in_detail(){
        return $this->hasMany(\App\StockInDetail::class);
    }

    public function created_by(){
        return $this->belongsTo(\App\User::class,'created_by','id');
    }

    public function supplier(){
        return $this->belongsTo(\App\Supplier::class,'supplier_id');
    }

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-Y');
    }
}
