<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Product;
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
    public function index()
    {
        return response()->json(Order::all(),200);
    }
    public function myOrders()
    {
        $orders=null;
        foreach ($this->guard()->user()->info()->get(['id']) as $id){
            $info=UserInfo::findOrFail($id['id']);
            $orders=$info->orders()->get(['id','datum','total']);
        }
        return response()->json($orders, 200);
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
        if ($request->session()->has('chart')) {
            $chart = $request->session()->get('chart');
        }
        foreach ($chart as $elements) {
            foreach ($elements as $element) {
                $product_order = new Order_Product();
                $product_order->order_id = $order->id;
                $product_order->product_id = $element->id;
                $product_order->save();
            }
        }
        $request->session()->forget('chart');
        return redirect('/');
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


    public function show($order)
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
        return response()->json(Order::findOrFail($order),200);
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
