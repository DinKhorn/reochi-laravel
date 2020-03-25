<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\StockIn;
use App\Exports\StockInExport;
use Illuminate\Http\Request;

class StockInController extends Controller
{

    public function export_csv()
    {
        return Excel::download(new StockInExport, 'stock-in.xlsx');
    }

    public function export_pdf()
    {
        return Excel::download(new StockInExport, 'stock-in.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }

    public function index(Request $request){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');

        $stock_in = StockIn::orderBy('id', 'desc')
                        ->with(['created_by','supplier']);
                        

        if($request->search){
            $search = '%'.$request->search.'%';
            $stock_in->where(function($q) use ($search) {
                $q->where('reference_no', 'LIKE',$search)
                    // ->orWhere('supplier_id->name','LIKE',$search)
                    ->orWhere('created_by','LIKE',$search);
            });
        }

        $stock_in=$stock_in->paginate($itemsPerPage);

        return response()->json(['stock_in' => $stock_in]);  
    }

    public function store(Request $request){

        $product_items = [];    
        $total = 0;
        $user_id=\Auth::user()->id;

        if(isset($request->items)) {
            foreach($request->items as $item) {
               $sub_amount =  $item['quantity'] * $item['unit_price'];
                $total+=$sub_amount;

               $product_items[]=[
                   'product_id'     => $item['id'],
                   'quantity'       => $item['quantity'],
                   'unit_price'     => $item['unit_price'],
                   'sub_amount'     => $sub_amount,
                   'total'         => $total,
                   'created_by'     =>$user_id,
                   'updated_by'     =>$user_id,
               ];
            }
        }

        $stock_in = new StockIn();
        $stock_in->reference_no = $request->reference_no;
        $stock_in->supplier_id  = $request->supplier_id;
        $stock_in->note         = $request->description;
        $stock_in->created_by   = $user_id;
        $stock_in->updated_by   = $user_id;
        $stock_in -> save();

        $stock_in->stock_in_detail()->createMany($product_items);
    }

    public function show($id){
        $stock_in = StockIn::with(['created_by','supplier'])
                        ->with(['stock_in_detail' => function($q){
                            $q->with('product');
                        }])->findOrFail($id);
                        // dd($stock_in);
        return response()->json(['stock_in', $stock_in]);
    }
}
