<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Outlet;
use App\Exports\OutletsExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Utilities\Util;

class OutletController extends Controller
{

    protected $util;

    public function __construct(Util $util)
    {
        $this->util = $util;
    }


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
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int) request('itemsPerPage');
        $outlets = Outlet::orderBy('id', 'asc');


        if ($request->search) {
            $search = '%' . $request->search . '%';
            $outlets->where(function ($q) use ($search) {
                $q->where('location', 'LIKE', $search)
                    ->orWhere('name', 'LIKE', $search)
                    ->orWhere('phone', 'LIKE', $search)
                    // ->orWhere('create_by','LIKE',$search)
                    ->orWhere('status', 'LIKE', $search);
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
            'image' => 'nullable',
        ]);

        DB::beginTransaction();

        try {

            $data       = $request->all();

            if ($request->has('image_url')) {
                $data['image']    = $this->util->uploadImage($request, 'image_url', config('constants.product_img_path'));
            }
            $outlet     = Outlet::create($data);

            DB::commit();
            return response()->json([
                'created'   => true,
            ]);
        } catch (\Exception $e) {

            DB::rollback();
            return response()->json([
                'created'   => false,
            ]);
        }

        // if ($request->get('image')) {
        //     $exploded = explode(',', $request->image);
        //     $decode = base64_decode($exploded[1]);

        //     if (str_contains($exploded[0], 'jpeg')) {
        //         $extension = 'jpeg';
        //     } else {
        //         $extension = 'png';
        //     }

        //     $fileName = str_random() . '.' . $extension;
        //     $path = public_path() . '/image/' . $fileName;

        //     file_put_contents($path, $decode);

        //     $img = \Image::make($path)->resize(null, 90, function ($constraint) {
        //         $constraint->aspectRatio();
        //     });

        //     $img->save(public_path('/image/' . $fileName));

        //     $outlet = new Outlet;
        //     $outlet->name = $request->name;
        //     $outlet->location = $request->location;
        //     $outlet->phone = $request->phone;
        //     // $outlet->create_by=auth()->user()->name;
        //     $outlet->status = $request->status;
        //     $outlet->save();
        // } else {
        //     $outlet = new Outlet;
        //     $outlet->name = $request->name;
        //     $outlet->location = $request->location;
        //     $outlet->phone = $request->phone;
        //     // $outlet->create_by=auth()->user()->name;
        //     $outlet->status = $request->status;
        //     $outlet->save();
        // }
        // // Outlet::create($request->all());

        // return response()->json([
        //     'created' => true,
        // ]);
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
            'image' => 'nullable',
        ]);


        DB::beginTransaction();

        try {

            $outlet   = Outlet::findOrFail($id);

            $data       = $request->all();

            if ($request->has('image_url')) {
                $data['image']    = $this->util->uploadImage($request, 'image_url', config('constants.product_img_path'));
            }

            $outlet->update($data);

            DB::commit();
            return response()->json([
                'updated'   => true,
            ]);
        } catch (\Exception $e) {

            DB::rollback();
            return response()->json([
                'updated'   => false,
            ]);
        }



        // if($request->get('image')) {
        //     $exploded = explode(',', $request->image);
        //     $decode = base64_decode($exploded[1]);

        //     if(str_contains($exploded[0], 'jpeg')) {
        //         $extension = 'jpeg';
        //     }
        //     else {
        //         $extension = 'png';
        //     }

        //     $fileName = str_random() . '.' . $extension;
        //     $path = public_path() . '/image/' . $fileName;

        //     file_put_contents($path, $decode);

        //     $img = \Image::make($path)->resize(null, 90, function($constraint) {
        //         $constraint->aspectRatio();
        //     });

        //     $img->save(public_path('/image/' . $fileName));

        //     $outlet=Outlet::findOrFail($id);
        //     $outlet->name=$request->name;       
        //     $outlet->location=$request->location;
        //     $outlet->phone=$request->phone;
        //     // $outlet->create_by=$request->create_by;
        //     $outlet->status=$request->status;
        //     $outlet->save();
        // }else{
        //     $outlet=Outlet::findOrFail($id);
        //     $outlet->name=$request->name;       
        //     $outlet->location=$request->location;
        //     $outlet->phone=$request->phone;
        //     // $outlet->create_by=$request->create_by;
        //     $outlet->status=$request->status;
        //     $outlet->save();
        // }



        // return response()->json([
        //     'updated' => true,
        // ]);
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
