<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $tablename='orders';
    protected $fillable = [
            'order_id', 'product_id', 
            'quantity', 'unit_price', 'discount','sub_amount','amount', 'created_by', 'updated_by'
        ];

    public function product(){
        return $this->belongsTo(\App\Product::class,'product_id')->select(['id','name','code']);
    }
}
