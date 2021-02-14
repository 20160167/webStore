<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:web', ['except' => ['view', 'show', 'addToChart', 'removeFromChart']]);
    }
    public function view(Request $request){
        $old=[];
        if($request->session()->has('chart')) {
            $old = $request->session()->get('chart');
        }
        $chart=array();
        foreach ($old as $elements) {
            foreach ($elements as $element) {
                $chart[$element->id]=$element;
            }
        }
        return response()->json($chart, 200);
    }
    public function addToChart(Request $request){
        $product=Product::find($request->id);
        if($request->session()->has('chart')){
            $old=$request->session()->get('chart');
            $chart=array();
            $request->session()->forget('chart');
            foreach ($old as $elements) {
                foreach ($elements as $element) {
                    $chart[$element->id]=$element;
                }
            }
            $chart[$request->id]=$product;
            $request->session()->push('chart',$chart);
        }else{
            $chart=array();
            $chart[$request->id]=$product;
            $request->session()->push('chart',$chart);
        }
        return response($chart, 201);
    }
    public function removeFromChart(Request $request){
//        $product=Product::find($request->id);
            $old=$request->session()->get('chart');
            $chart=array();
            $request->session()->forget('chart');
            foreach ($old as $elements) {
                foreach ($elements as $element) {
                    if($element->id!=$request->id)
                    $chart[$element->id]=$element;
                }
            }
//            $chart[$request->id]=$product;
            $request->session()->push('chart',$chart);

        return response($chart, 204);
    }
}
