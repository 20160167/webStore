<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
*/

Route::group(
    [
        'middleware' => 'api',
        'namespace'  => 'App\Http\Controllers',
        'prefix'     => 'auth',
    ],
    function ($router) {
        Route::post('login', 'AuthController@login');
        Route::post('register', 'AuthController@register');
        Route::post('logout', 'AuthController@logout');
        Route::get('profile', 'AuthController@profile');
        Route::post('refresh', 'AuthController@refresh');
    }
);

Route::group(
    [
        'middleware' => 'api',
        'namespace'  => 'App\Http\Controllers',
    ],
    function ($router) {
        Route::get('categories', 'CategoryController@index');
        Route::get('categories/{id}', 'CategoryController@show');
        Route::get('products', 'ProductController@index');
        Route::get('products/{id}', 'ProductController@show');
        Route::get('chart', 'ChartController@view');
        Route::post('add-to-chart', 'ChartController@addToChart');
        Route::post('remove-from-chart', 'ChartController@removeFromChart');
        Route::post('check-out', 'OrderController@create');
        Route::put('update-user', 'UserInfoController@edit');
        //ovde kao u todos hasmany pa da vrati svoje
        Route::get('orders', 'OrderController@myOrders');
        Route::get('orders/{order}', 'OrderController@show');
    }
);
Route::group(
    [   'prefix'     => 'admin',
        'middleware' => 'admin',
        'namespace'  => 'App\Http\Controllers',
    ],
    function ($router) {
        Route::post('categories', 'CategoryController@store');
        Route::put('categories/{id}', 'CategoryController@edit');
        Route::delete('categories/{id}', 'CategoryController@destroy');
        Route::post('products', 'ProductController@create');
        Route::put('products/{id}', 'ProductController@edit');
        Route::delete('products/{id}', 'ProductController@destroy');
        Route::get('orders', 'OrderController@index');
        Route::get('orders/{order}', 'OrderController@show');
        Route::get('users', 'UserInfoController@index');
        Route::get('users/{id}', 'UserInfoController@show');
        Route::put('users/{id}', 'UserInfoController@edit');

    }
);
