<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\StockIn;
use Illuminate\Http\Request;

class StockInController extends Controller
{

    public function index(){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');

        $stock_in = StockIn::orderBy('id', 'desc')
                        ->paginate($itemsPerPage);

        return response()->json(['stock_in' => $stock_in]);  
    }

    public function store(Request $request){

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
                   'created_by'     =>$user_id,
                   'updated_by'     =>$user_id,
               ];
            }
        }

        $stock_in = new StockIn();
        $stock_in->reference_no = $request->reference_no;
        $stock_in->supplier_id  = $request->supplier_id;
        $stock_in->note         = $request->description;
        $stock_in->created_by   = $request->$user_id;
        $stock_in->updated_by   = $request->$user_id;
        $stock_in -> save();

        $stock_in->stock_in_detail()->createMany($product_items);
    }
}
