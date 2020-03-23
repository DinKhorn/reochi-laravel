<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\StockOut;

class StockOutController extends Controller
{
    public function index(){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');

        $orders = StockOut::orderBy('id', 'desc')
                        // ->with(['outlet','order_by','location'])
                        ->paginate($itemsPerPage);

        return response()->json(['orders' => $orders]);  
    }

    public function store(Request $request){

        $product_items = [];    
        $total = 0;
        $user_id=\Auth::user()->id;

        dd($request->all());

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

        $stock_out = new StockOut();
        $stock_out->reference_no = $request->reference_no;
        $stock_out->supplier_id  = $request->supplier_id;
        $stock_out->product_id   = $stock_out->
        $stock_out->quantity     = $request->
        $stock_out->unit_price   = $request->
        $stock_out->sub_amount   = $request->
        $stock_out->amount       = $request->
        $stock_out->note         = $request->description;
        $stock_out->created_by   = $request->$user_id;
        $stock_out->updated_by   = $request->$user_id;
        $stock_out -> save();
    }
}
