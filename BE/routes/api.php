<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\CRUDAPI\AttributeController;
use App\Http\Controllers\API\CRUDAPI\BrandController;
use App\Http\Controllers\API\CRUDAPI\CartController;
use App\Http\Controllers\API\CRUDAPI\CategoryController;
use App\Http\Controllers\API\CRUDAPI\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refreshToken']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
});
//category
Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'getData']);
    Route::post('/', [CategoryController::class, 'create'])->middleware('auth:sanctum');
    Route::post('/edit/{id}', [CategoryController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [CategoryController::class, 'delete'])->middleware('auth:sanctum');
});
//product
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'getAll']);
    Route::post('/', [ProductController::class, 'create'])->middleware('auth:sanctum');
    Route::post('/edit/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum');
});
//attribute
Route::middleware('auth:sanctum')->prefix('attributes')->group(function () {
    Route::get('/', [AttributeController::class, 'index']);
    Route::get('/{id}', [AttributeController::class, 'getOne']);
    Route::post('/', [AttributeController::class, 'create']);
    Route::post('/edit/{id}', [AttributeController::class, 'update']);
    Route::delete('/{id}', [AttributeController::class, 'destroy']);
    Route::post('/value', [AttributeController::class, 'createAttributeValue']);
    Route::put('/value/{id}', [AttributeController::class, 'updateAttributeValue']);
    Route::delete('/value/{id}', [AttributeController::class, 'deleteAttributeValue']);
});
//brand
Route::prefix('brands')->group(function () {
    Route::get('/', [BrandController::class, 'data']);
    Route::post('/', [BrandController::class, 'create'])->middleware('auth:sanctum');
    Route::post('/edit/{id}', [BrandController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [BrandController::class, 'delete'])->middleware('auth:sanctum');
});
//CART
Route::middleware('auth:sanctum')->prefix('cart')->group(function(){
   Route::get('/',[CartController::class,'getCart']);
   Route::post('/',[CartController::class,'addToCart']);
   Route::post('/update',[CartController::class,'updateToCart']);
   Route::delete('/{id}',[CartController::class,'deleteToCart']);
   Route::post('/cart-variant',[CartController::class,'updateVariantCart']);
   Route::post('/cart-quantity',[CartController::class,'updateQuantityCart']);

});
