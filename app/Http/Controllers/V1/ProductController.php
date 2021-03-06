<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Product;
use App\Category;
// use App\Order;

use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   

        $itemsPerPage = empty(request('itemsPerPage')) ? 10 : (int)request('itemsPerPage');
        $products = Product::with(['categories'])
                        ->orderBy('id', 'desc')
                        ->paginate($itemsPerPage);

        return response()->json(['products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'code' => 'required',
            'description' => 'nullable',
            'unit' => 'required|numeric',
            'price' => 'required|numeric',
            'category_id' => 'nullable',
            'image'=> 'nullable',
        ]);

        // Save Image
        if($request->get('image')) {
            $exploded = explode(',', $request->image);
            $decode = base64_decode($exploded[1]);

            if(str_contains($exploded[0], 'jpeg')) {
                $extension = 'jpeg';
            }
            else {
                $extension = 'png';
            }

            $fileName = str_random() . '.' . $extension;
            $path = public_path() . '/image/' . $fileName;
            
            file_put_contents($path, $decode);

            $img = \Image::make($path)->resize(null, 90, function($constraint) {
                $constraint->aspectRatio();
            });

            $img->save(public_path('/image/' . $fileName));


            $product = new Product();
            $product->image = $fileName;
            $product->user_id = auth()->user()->id;
            $product->category_id = auth()->user()->id;
            $product->name = $request->name;
            $product->code = $request->code;
            $product->description = $request->description;
            $product->unit = $request->unit;
            $product->price = $request->price;
            $product->save();
 

        }
        else {

            $product = new Product();
            $product->user_id = auth()->user()->id;
            $product->category_id = auth()->user()->id;
            $product->name = $request->name;
            $product->code = $request->code;
            $product->description = $request->description;
            $product->unit = $request->unit;
            $product->price = $request->price;
            $product->save();
 
        }
        

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
        $product = Product::findOrFail($id);

        return response()->json(['product' => $product]);
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
        $data = $request->validate([
            'name' => 'required',
            'code' => 'required',
            'description' => 'nullable',
            'unit' => 'required|integer',
            'price' => 'required|numeric',
            'category_id' => 'nullable',
            'image'=> 'nullable',
        ]);


        // dd($request->get('image'));

        // Save Image
        if($request->get('image')) {
            $exploded = explode(',', $request->image);
            $decode = base64_decode($exploded[1]);

            if(str_contains($exploded[0], 'jpeg')) {
                $extension = 'jpeg';
            }
            else {
                $extension = 'png';
            }

            $fileName = str_random() . '.' . $extension;
            $path = public_path() . '/image/' . $fileName;
            
            file_put_contents($path, $decode);

            $img = \Image::make($path)->resize(null, 90, function($constraint) {
                $constraint->aspectRatio();
            });

            $img->save(public_path('/image/' . $fileName));


            $product = Product::findOrFail($id);
            $product->image = $fileName;
            $product->user_id = auth()->user()->id;
            $product->category_id = auth()->user()->id;
            $product->name = $request->name;
            $product->code = $request->code;
            $product->description = $request->description;
            $product->unit = $request->unit;
            $product->price = $request->price;
            $product->save();


        }
        else {

            $product = Product::findOrFail($id);
            $product->user_id = auth()->user()->id;
            $product->category_id = auth()->user()->id;
            $product->name = $request->name;
            $product->code = $request->code;
            $product->description = $request->description;
            $product->unit = $request->unit;
            $product->price = $request->price;
            $product->save();

        }

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
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'deleted' => true,
        ]);
    }
}
