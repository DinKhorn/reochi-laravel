<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StockInController extends Controller
{
    public function store(Request $request){

        dd($request->all());

        $product_items = [];    
        $total = 0;
        $user_id=\Auth::user()->id;

        if(isset($request->items)) {
            foreach($request->items as $item) {
               $sub_amount =  $item['quantity'] * $item['unit_price'];

                if($item['discount']>0){
                    $amount= $sub_amount * (1 - $item['discount']/100);
                }else{
                    $amount= $sub_amount;
                }

                $total+=$amount;

               $product_items[]=[
                   'product_id'     => $item['id'],
                   'quantity'       => $item['quantity'],
                   'unit_price'     => $item['unit_price'],
                   'discount'       => $item['discount'],
                   'sub_amount'     => $sub_amount,
                   'amount'         => $amount,
                   'created_by'     =>$user_id,
                   'updated_by'     =>$user_id,
               ];
            }
        }

        $order=new StockIn();
    }
}
