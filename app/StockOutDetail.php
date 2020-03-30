<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockOutDetail extends Model
{
    protected $tablename='stock_out_details';
    protected $fillable=[
        'stock_out_id',
        'product_id',
        'quantity',
        'unit_price',
        'sub_amount',
        'created_by',
        'updated_by'
    ];

    public function product(){
        return $this->belongsTo(\App\Product::class,'product_id')->select(['id','name','code']);
    }
}
