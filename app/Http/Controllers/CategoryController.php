<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
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
        $categories=Category::all();
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($categories, 200);
        }else{
            return response()->xml(['category'=>$categories->toArray()]);
        }
//        return response($request->getAcceptableContentTypes());
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
        $category=new Category();
        $category->brand=$request->brand;
        $category->save();
        return response($category, 201);
    }


    public function show($id,Request $request)
    {
        $category=Category::findOrFail($id);
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($category, 200);
        }else{
            return response()->xml(['category'=>$category->toArray()]);
        }
//        return response()->json(Category::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $category=Category::findOrFail($request->id);
        $category->brand=$request->brand;
        $category->save();
        return response($category, 202);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    public function destroy($id)
    {
        $category=Category::find($id);

        if(is_null($category)){
            return response()->json(["message"=>"Category doesnt exist"],404);
        }
        $category->delete();
        return response()->json(null,204);
    }
}
