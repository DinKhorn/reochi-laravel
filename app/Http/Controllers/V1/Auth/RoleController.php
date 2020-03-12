<?php

namespace App\Http\Controllers\v1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Role;
use SebastianBergmann\Environment\Console;

class RoleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of roles from current logged user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke()
    {
        return auth()->user()->getRoleNames();
    }

    public function index()
    {
        $itemsPerPage = empty(request('itemsPerPage')) ? 5 : (int)request('itemsPerPage');
        $role = Role::orderBy('id', 'desc')
                            ->paginate($itemsPerPage);
        return response()->json(['role' => $role]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
        ]);
        
        Role::create($request->all());

        return response()->json([
            'created' => true,
        ]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'name' => 'required',
        ]);
        
        $role = Role::findOrFail($id);
        $role->update($request->all());

        return response()->json([
            'created' => true,
        ]);
    }

    public function destroy($id){
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
