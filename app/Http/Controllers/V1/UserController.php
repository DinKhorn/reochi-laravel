<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\{User};

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function export_csv()
    {
        return Excel::download(new UsersExport, 'user.xlsx');
    }


    public function export_pdf()
    {
        return Excel::download(new UsersExport, 'user.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }

    public function index(Request $request)
    {  
        // $items      = User::with('role')->has('role')->OrderBy('id', 'desc');
        $items      = User::with('role')->OrderBy('id', 'asc');
      
        // if($request->name) {
        //     $items->where(function($q) use ($request) {
        //         $q->where('name', 'like', '%' . $request->name . '%');
        //     });
        // }

        // if($request->email) {
        //     $items->where(function($q) use ($request) {
        //         $q->where('email', 'like', '%' . $request->email . '%');
        //     });
        // }

        if($request->term){
            $term = '%'.$request->term.'%';
            $items->where(function($q) use ($term) {
                $q->where('email', 'LIKE',$term)
                  ->orWhere('name','LIKE',$term);
            });

        }

        $users = $items->paginate(10);

        return response()->json(['users' => $users]);
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
            'email' => 'required|email',
            'role'=>'required',
            'password' => 'required|between:6,25'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role['id'];
        $user->password = Hash::make($request->password);
        $user->save();

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
        $user = User::select('users.*','R.name as role_name')->join("roles AS R","R.id","=","users.role_id")->findOrFail($id);

        return response()->json(['user' => $user]);
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
            'email' => 'required|email',
            'password' => 'required|between:6,25'
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

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
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
