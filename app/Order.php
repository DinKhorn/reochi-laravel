<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $tablename='orders';
    protected $fillable = [
            'reference_no',
            'outlet_id',
            'location_id',
            'order_status',
            'payment_status', 
            'note', 
            'sub_total', 
            'total', 
            'due_amount', 
            'created_by', 
            'updated_by'
        ];

	// protected $fillable = [
	// 	'name', 'unit_cost', 'discount', 'member_id',
	// ];

    // public function member()
    // {
    //     return $this->belongsTo(\App\Member::class);
    // }

    // public function products()
    // {
    //     return $this->belongsToMany(\App\Product::class, 'order_id');
    // }

    // public function products()
    // {
    // 	return $this->belongsToMany(\App\Product::class);
    // }

    public function order_detail(){
        return $this->hasMany(\App\OrderDetail::class);
    }

    public function outlet(){
        return $this->belongsTo(\App\Outlet::class,'outlet_id');
    }

    public function order_by(){
        return $this->belongsTo(\App\User::class,'created_by','id');
    }

    public function location(){
        return $this->belongsTo(\App\Outlet::class,'location_id');
    }

    public function getCreatedAtAttribute($date)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('d-m-Y');
    }

}
