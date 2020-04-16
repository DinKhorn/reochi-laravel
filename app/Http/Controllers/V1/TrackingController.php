<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Tracking;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trackings = Tracking::with(['user'])->paginate();

        return $trackings;
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
            'lat'   => 'required',
            'lng'   => 'required',
        ]);


        $user       = auth()->user();

        $data       = [
            'user_id'   => $user->id,
            'latitude'  => $request->input('lat'),
            'longitude' => $request->input('lng'),

        ];

        $tracking   = Tracking::create($data);
        if ($tracking) {
            return response()->json(['created' => true]);
        } else {
            return response()->json(['created' => false]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
