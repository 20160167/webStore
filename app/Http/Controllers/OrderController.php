<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Product;
use App\Models\Product;
use App\Models\UserInfo;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['create']]);
        $this->user = $this->guard()->user();
    }//end __construct()
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = Order::all();
        $order_products = Order_Product::all();
        foreach ($orders as $o) {
            $products = [];
            foreach ($order_products as $op) {
                if ($o->id == $op->order_id) {
                    $products[count($products)] = Product::find($op->product_id);
                }
            }
            $o->products = $products;
        }
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($orders, 200);
        }else{
            return response()->xml(['order'=>$orders->toArray()]);
        }
//        return response()->json($orders,200);
    }
    public function myOrders(Request $request)
    {
        $order_products=Order_Product::all();
        $orders=null;
        foreach ($this->guard()->user()->info()->get(['id']) as $id){
            $info=UserInfo::findOrFail($id['id']);
            $orders=$info->orders()->get(['id','datum','total']);
        }
        $products=[];
        foreach ($orders as $order){
            foreach ($order_products as $order_product) {
                if ($order->id == $order_product->order_id) {
                    $products[count($products)] = Product::find($order_product->product_id);
                }
            }
            $order->products=$products;
        }
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($orders, 200);
        }else{
            return response()->xml(['order'=>$orders->toArray()]);
        }
//        return response()->json($orders, 200);
    }

    public function create(Request $request)
    {
        $order = new Order();

        if($this->guard()->user()){
            $order->datum = $request->datum;
            $order->total = $request->total;
            $ui=null;
            foreach ($this->guard()->user()->info()->get(['id']) as $id){
                $ui=$id['id'];
            }
            $order->user_info_id = $ui;
            $order->save();
        }else {
            //ako nam nije prosledio token
            $user_info = new UserInfo();
            $user_info->name = $request->name;
            $user_info->surname = $request->surname;
            $user_info->address = $request->address;
            $user_info->city = $request->city;
            $user_info->phone = $request->phone;
            $user_info->save();
            $order->datum = $request->datum;
            $order->total = $request->total;
            $order->user_info_id = $user_info->id;
            $order->save();
        }
        //u slucaju da nije samo sacuvamo order sa id-ijem usera iz guarda

        $chart = [];
//        if ($request->session()->has('chart')) {
//            $chart = $request->session()->get('chart');
//        }
        $chart=$request->chart;
        foreach ($chart as $element) {
                $product_order = new Order_Product();
                $product_order->order_id = $order->id;
                $product_order->product_id = $element;
                $product_order->save();
            }

//        $request->session()->forget('chart');
        return response()->json("kul",201);
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


    public function show($order, Request $request)
    {
//        $ui=null;
//        foreach ($this->guard()->user()->info()->get(['id']) as $id){
//            $info=UserInfo::findOrFail($id['id']);
//            $ui=$id['id'];
//        }
//        $order=Order::findOrFail($order);
        //srediti ovu proveru
//        if($order->user_info_id!=$ui){
//            return response()->json("you are not user", 404);
//        }
        $o=Order::find($order);
        $order_products=Order_Product::all();
        $products=[];
        foreach ($order_products as $order_product) {
            if ($o->id == $order_product->order_id) {
                $products[count($products)] = Product::find($order_product->product_id);
            }
        }
        $o->products=$products;
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($o, 200);
        }else{
            return response()->xml(['order'=>$o->toArray()]);
        }
//        return response()->json($o,200);
    }
    public function admin($order, Request $request)
    {
//        $ui=null;
//        foreach ($this->guard()->user()->info()->get(['id']) as $id){
//            $info=UserInfo::findOrFail($id['id']);
//            $ui=$id['id'];
//        }
//        $order=Order::findOrFail($order);
        //srediti ovu proveru
//        if($order->user_info_id!=$ui){
//            return response()->json("you are not user", 404);
//        }
        $o=Order::find($order);
        $user=UserInfo::find($o->user_info_id);
        $order_products=Order_Product::all();
        $products=[];
        foreach ($order_products as $order_product) {
            if ($o->id == $order_product->order_id) {
                $products[count($products)] = Product::find($order_product->product_id);
            }
        }
        $o->user=$user;
        $o->products=$products;
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($o, 200);
        }else{
            return response()->xml(['order'=>$o->toArray()]);
        }
//        return response()->json($o,200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
    protected function guard()
    {
        return Auth::guard();

    }
}
