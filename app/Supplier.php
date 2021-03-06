<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
	protected $fillable = ['name', 'description', 'company_name', 'email', 'phone', 'address'];


    // public function purchases()
    // {
    // 	return $this->hasMany(\App\Purchase::class);
    // }
    public function return_sales()
    {
        return $this->hasMany(\App\ReturnSale::class);
    }
    public function return_purchases()
    {
        return $this->hasMany(\App\ReturnPurchase::class);
    }
    public function quotations()
    {
        return $this->hasMany(\App\Quotation::class);
    }
    public function branch()
    {
        return $this->hasMany(\App\Branch::class);
    }
}
