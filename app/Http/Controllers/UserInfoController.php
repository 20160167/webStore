<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserInfoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->user = $this->guard()->user();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $user=UserInfo::all();
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($user, 200);
        }else{
            return response()->xml(['info'=>$user->toArray()]);
        }
    }
    public function me()
    {
        $u=null;
        $usersInfo=UserInfo::all();
        foreach ($usersInfo as $userInfo) {
            if($userInfo->user_id==$this->user->id){
                $u=$userInfo;
            }
        }
        return response()->json($u,200);
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
        //
    }


    public function show($userInfo, Request $request)
    {
        $user=UserInfo::findOrFail($userInfo);
        if($request->getAcceptableContentTypes()[0]=="application/json") {
            return response()->json($user, 200);
        }else{
            return response()->xml(['info'=>$user->toArray()]);
        }
    }


    public function edit(Request $request)
    {
        //dodati validaciju za polja
        $info = UserInfo::find($request->id);
        $info->name = $request->name;
        $info->surname = $request->surname;
        $info->address = $request->address;
        $info->city = $request->city;
        $info->phone = $request->phone;
        $info->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserInfo  $userInfo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserInfo $userInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserInfo  $userInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserInfo $userInfo)
    {
        //
    }
    protected function guard()
    {
        return Auth::guard();

    }
}
