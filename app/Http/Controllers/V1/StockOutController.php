<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\StockOut;
use App\Supplier;

class StockOutController extends Controller
{
    public function index(){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');

        $stock_out = StockOut::addSelect(['deliver_name' => Supplier::select('name')
                            ->whereColumn('suppliers.id', 'deliver_id')
                            ->limit(1)
                        ])
                        ->orderBy('id', 'desc')
                        ->with(['outlet','location','deliver','salesman','created_by'])
                        ->whereHas('deliver')
                        ->paginate($itemsPerPage);

        // $stock_out = $stock_out->map(function($item){
        //     $deliver_name = null;
        //     if($item->deliver){
        //         $deliver_name = $item->deliver->name;
        //     }
        //     $item->deliver_name = $deliver_name;
        //     return $item;
        // });
        return response()->json(['stock_out' => $stock_out]);  
    }

    public function store(Request $request){
        // dd($request->all());
        $product_items = [];    
        $total = 0;
        $user_id=\Auth::user()->id;

        if(isset($request->items)) {
            foreach($request->items as $item) {
                $sub_amount =  $item['quantity'] * $item['unit_price'];

               $product_items[]=[
                'product_id'     => $item['id'],
                'quantity'       => $item['quantity'],
                'unit_price'     => $item['unit_price'],
                'sub_amount'     => $sub_amount,
                'created_by'     =>$user_id,
                'updated_by'     =>$user_id,
               ];
            }
        }

        $stock_out = new StockOut();
        $stock_out->reference_no = $request->reference_no;
        $stock_out->outlet_id  = $request->outlets['id'];
        $stock_out->location_id  = $request->location['id'];
        $stock_out->deliver_id   = $request->supplier_id['id'];
        $stock_out->salesman_id  = $request->supplier_id['id'];
        $stock_out->note         = $request->description;
        $stock_out->created_by   = $request->$user_id;
        $stock_out->updated_by   = $request->$user_id;
        $stock_out -> save();

        $stock_out->stock_out_detail()->createMany($product_items);
    }
}
