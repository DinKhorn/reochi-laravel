<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use App\Exports\SalesmanExport;
use App\Salesman;
class SalesmanController extends Controller
{

    public function export_csv()
    {
        return Excel::download(new SalesmanExport, 'salesman.xlsx');
    }

    public function export_pdf()
    {
        return Excel::download(new SalesmanExport, 'salesman.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }

    public function index(Request $request){
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');
        $salesman = Salesman::orderBy('id', 'asc');

        if($request->search){
            $search = '%'.$request->search.'%';
            $salesman->where(function($q) use ($search) {
                $q->where('name', 'LIKE',$search)
                    ->orWhere('email','LIKE',$search)
                    ->orWhere('phone','LIKE',$search)
                    ->orWhere('address','LIKE',$search);
            });
        }

        $salesman =  $salesman->paginate($itemsPerPage);

        return response()->json(['salesman' => $salesman]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ]);
        
        Salesman::create($request->all());

        return response()->json([
            'created' => true,
        ]);
    }

    public function show($id){
        $salesman = Salesman::findOrFail($id);

        return response()->json(['salesman' => $salesman]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ]);

        $salesman=Salesman::findOrFail($id);
        $salesman->update($request->all());

        return response()->json([
            'updated' => true,
        ]);
    }

    public function destroy($id){
        $salesman = Salesman::findOrFail($id);
        $salesman->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
