<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');

        $orders = Order::orderBy('id', 'asc')
                        ->with(['outlet','order_by','location'])
                        ->paginate($itemsPerPage);

        return response()->json(['orders' => $orders]);  
    }

    public function store(Request $request){
      
        $product_items = [];    
        $total = 0;
        $user_id=\Auth::user()->id;
        $count = Order::whereDay('created_at', date('d'))->count();

        if(isset($request->items)) {
            foreach($request->items as $item) {
               $sub_amount =  $item['quantity'] * $item['unit_price'];
                $amount= $sub_amount;
                $total+=$amount;

               $product_items[]=[
                   'product_id'     => $item['product_id'],
                   'quantity'       => $item['quantity'],
                   'unit_price'     => $item['unit_price'],
                   'sub_amount'     => $sub_amount,
                   'amount'         => $amount,
                   'created_by'     =>$user_id,
                   'updated_by'     =>$user_id,
               ];
            }
        }

        $order=new Order();
        $order->reference_no='order-'. date('Ymd-') . date('His') . str_pad($count + 1, 4, '0', STR_PAD_LEFT);
        $order->outlet_id=$request->outlet['id'];
        $order->location_id=$request->location['id'];
        $order->order_status=$request->order_status;
        $order->payment_status=$request->payment_status;
        $order->note=$request->note;
        $order->sub_total=$total;
        $order->due_amount=0;
        $order->total=$total-0;
        $order->created_by=$user_id;
        $order->updated_by=$user_id;
        $order->save();

        $order->order_detail()->createMany($product_items);

        return response()->json([
            'created' => true,
        ]);
    }

    public function show($id){
        $order = Order::with(['outlet','order_by','location'])
                        ->with(['order_detail' => function($q){
                            $q->with('product');
                        }])->findOrFail($id);
        $order->items = $order->order_detail;            
        return response()->json(['order', $order]);
    }

    public function update(Request $request, $id){
        
        $product_items = [];    
        $total = 0;
        $user_id=\Auth::user()->id;
        $count = Order::whereDay('created_at', date('d'))->count();

        if(isset($request->items)) {
            $items =  $request->items;
         
            foreach($items as $item) {
               
                $product = [];
                if(is_array($item)){
                    if(isset($item['order_id'])){
                        $product['product_id'] = $item['product_id'];
                        $product['quantity'] = $item['quantity'];
                        $product['unit_price'] = $item['unit_price'];
                    }else{
                        $product['product_id'] = $item['product_id'];
                        $product['quantity'] = $item['quantity'];
                        $product['unit_price'] = $item['unit_price'];
                    }
                    $amount = $product['quantity'] * $product['unit_price'];
                    $product['sub_amount'] = $amount;
                    $product['amount']     = $amount;
                    $product['created_by']     = $user_id;
                    $product['updated_by']     = $user_id;
                    $total+=$amount;
                    array_push($product_items,$product);
                    
                }
            }
        }
        $order=Order::findOrFail($id);
        $order->outlet_id=$request->outlet['id'];
        $order->location_id=$request->location['id'];
        $order->note=$request->note;
        $order->sub_total=$total;
        $order->due_amount=0;
        $order->total=$total-0;
        $order->updated_by=$user_id;
        $order->save();
        if(count($product_items)>0){
            $order->order_detail()->delete();
            $order->order_detail()->createMany($product_items);
        }
        return response()->json([
            'updated' => true,
        ]);
    }
}
