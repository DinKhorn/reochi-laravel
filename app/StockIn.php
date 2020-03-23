<?php

namespace App;

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
}
