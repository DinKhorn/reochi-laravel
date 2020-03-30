<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Transfer;

use App\Product;

use Carbon\Carbon;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');

        $query = Transfer::with(['branch', 'products'])
                        ->orderBy('id', 'desc');
        
        if($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('from_location', 'like', '%' . $request->search . '%')
                ->orWhere('to_location', 'like', '%' . $request->search . '%')
                ->orWhere('status', 'like', '%' . $request->search . '%')
                ->orWhere('shipping_charge', 'like', '%' . $request->search . '%')

                // Search Thorough Branch Relationship
                ->orWhereHas('branch', function($q) use ($request) {
                    $q->where('name', 'like', '%' .  $request->search . '%')
                    ->orWhere('address', 'like', '%' .  $request->search . '%')
                    ->orWhere('city', 'like', '%' .  $request->search . '%')
                    ->orWhere('country', 'like', '%' .  $request->search . '%');
                });
            });
        }

        $transfer = $query->paginate($itemsPerPage);

        return response()->json(['transfer' => $transfer]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'from_location' => 'required',
            'to_location' => 'required',
            'status' => 'required',
            'description' => 'nullable',
            'shipping_charge' => 'nullable',
        ]);

        // dd($request->products);

        $count = Transfer::whereDay('created_at', date('d'))->count();

        $transfer = new Transfer();
        $transfer->branch_id = auth()->user()->id;
        // $transfer->product_id= auth()->user()->id;
        $transfer->from_location = $request->input('from_location');
        $transfer->to_location = $request->input('to_location');
        $transfer->status = $request->input('status');
        $transfer->reference_no = $request->reference_no;
        $transfer->shipping_charge = $request->input('shipping_charge');
        $transfer->save();

        if($request->products) {
            foreach($request->products as $product) {
                $transfer->products()->attach($product['id'], [
                    'unit_price' => $product['price'],
                    'quantity' => $product['quantity'],
                ]);
            }
        }

        dd($transfer->products);

        return response()->json(['created' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transfer = Transfer::findOrFail($id);

        return response()->json(['tra$transfer' => $transfer]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $transfer = Tran::findOrFail($id); 
        // $supplier->purchase_id = auth()->user()->id;
        $transfer->branch_id = auth()->user()->id;
        // $transfer->product_id= auth()->user()->id;
        $transfer->from_location = $request->input('from_location');
        $transfer->to_location = $request->input('to_location');
        $transfer->status = $request->input('status');
        $transfer->reference_no = $request->reference_no;
        $transfer->shipping_charge = $request->input('shipping_charge');
        $transfer->save();

        if($request->products) {
            foreach($request->products as $product) {
                $transfer->products()->attach($product['id'], [
                    'unit_price' => $product['price'],
                    'quantity' => $product['quantity'],
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transfer = Transfer::findOrFail($id);
        $transfer->delete();

        return response()->json(['deleted' => true]);
    }
}
