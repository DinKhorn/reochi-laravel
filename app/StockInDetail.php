<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockInDetail extends Model
{
    protected $tablename='stock_in_details';
    protected $fillable=[
        'stock_in_id',
        'product_id',
        'quantity',
        'unit_price',
        'created_by'

        
    ];
}
