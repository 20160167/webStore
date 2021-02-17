<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products=Product::all();
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($products, 200);
        }else{
            return response()->xml(['product'=>$products->toArray()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //dodati validaciju
        $product=new Product();
        $product->model=$request->model;
        $product->price=$request->price;
        $product->description=$request->description;
        $product->url=$request->url;
        $product->ram=$request->ram;
        $product->memory=$request->memory;
        $product->screen_size=$request->screen_size;
        $product->camera=$request->camera;
        $product->front_camera=$request->front_camera;
        $product->battery=$request->battery;
        $product->system=$request->system;
        $product->brand_id=$request->brand_id;

        $product->save();
        return response($product, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    public function show($id, Request $request)
    {
        $product=Product::findOrFail($id);
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($product, 200);
        }else{
            return response()->xml(['product'=>$product->toArray()]);
        }
    }


    public function edit(Request $request)
    {
        //dodati validaciju
        $product=Product::findOrFail($request->id);
        $product->model=$request->model;
        $product->price=$request->price;
        $product->description=$request->description;
        $product->url=$request->url;
        $product->ram=$request->ram;
        $product->memory=$request->memory;
        $product->screen_size=$request->screen_size;
        $product->camera=$request->camera;
        $product->front_camera=$request->front_camera;
        $product->battery=$request->battery;
        $product->system=$request->system;
        $product->brand_id=$request->brand_id;

        $product->save();
        return response($product, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    public function destroy($id)
    {
        $product=Product::find($id);

        if(is_null($product)){
            return response()->json(["message"=>"Product doesnt exist"],404);
        }
        $product->delete();
        return response()->json(null,204);
    }
}
