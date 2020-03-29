<?php

namespace App\Http\Controllers\V1;

use App\DeliveryMan;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use App\Exports\DeliveryMansExport;

class DeliveryManController extends Controller
{

    public function export_csv()
    {
        return Excel::download(new DeliveryMansExport, 'delivery_man.xlsx');
    }

    public function export_pdf()
    {
        return Excel::download(new DeliveryMansExport, 'delivery_man.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }

    public function index(Request $request){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');
        $deliveryman = DeliveryMan::orderBy('id', 'asc');

        if($request->search){
            $search = '%'.$request->search.'%';
            $deliveryman->where(function($q) use ($search) {
                $q->where('name', 'LIKE',$search)
                    ->orWhere('email','LIKE',$search)
                    ->orWhere('phone','LIKE',$search)
                    ->orWhere('address','LIKE',$search);
            });
        }

        $deliveryman =  $deliveryman->paginate($itemsPerPage);

        return response()->json(['deliveryman' => $deliveryman]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ]);
        
        DeliveryMan::create($request->all());

        return response()->json([
            'created' => true,
        ]);
    }

    public function show($id){
        $deliveryman = DeliveryMan::findOrFail($id);

        return response()->json(['deliveryman' => $deliveryman]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ]);

        $deliveryman=DeliveryMan::findOrFail($id);
        $deliveryman->update($request->all());

        return response()->json([
            'updated' => true,
        ]);
    }

    public function destroy($id){
        $deliveryman = DeliveryMan::findOrFail($id);
        $deliveryman->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
