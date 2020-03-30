<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Outlet;
use App\Exports\OutletsExport;
use Illuminate\Http\Request;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function export_csv()
    {
        return Excel::download(new OutletsExport, 'outlets.xlsx');
    }


    public function export_pdf()
    {
        return Excel::download(new OutletsExport, 'outlets.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }

    public function index(Request $request)
    {
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');
        $outlets = Outlet::orderBy('id', 'asc');
                           

        if($request->search){
            $search = '%'.$request->search.'%';
            $outlets->where(function($q) use ($search) {
                $q->where('location', 'LIKE',$search)
                    ->orWhere('name','LIKE',$search)
                    ->orWhere('phone','LIKE',$search)
                    ->orWhere('create_by','LIKE',$search)
                    ->orWhere('status','LIKE',$search);
            });
        }

        $outlets =  $outlets->paginate($itemsPerPage);

        return response()->json(['outlets' => $outlets]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'name' => 'required',
            'location' => 'required',
            'phone' => 'required',
            'status' => 'required',
        ]);

        $outlet=new Outlet;
        $outlet->name=$request->name;
        $outlet->location=$request->location['name'];
        $outlet->phone=$request->phone;
        $outlet->create_by=auth()->user()->name;
        $outlet->status=$request->status;
        $outlet->save();
        // Outlet::create($request->all());

        return response()->json([
            'created' => true,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $outlet = Outlet::findOrFail($id);

        return response()->json(['outlet' => $outlet]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $request->validate([
            'name' => 'required',
            'location' => 'required',
            'phone' => 'required',
            'status' => 'required',
        ]);
        
        $outlet=Outlet::findOrFail($id);
        $outlet->name=$request->name;       
        $outlet->location=$request->location['name'];
        $outlet->phone=$request->phone;
        $outlet->create_by=$request->create_by;
        $outlet->status=$request->status;
        $outlet->save();

        return response()->json([
            'updated' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $outlet = Outlet::findOrFail($id);
        $outlet->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
