<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\ChatAPI\ChatController;
use App\Http\Controllers\API\CRUDAPI\AddressController;
use App\Http\Controllers\API\CRUDAPI\AttributeController;
use App\Http\Controllers\API\CRUDAPI\BrandController;
use App\Http\Controllers\API\CRUDAPI\CartController;
use App\Http\Controllers\API\CRUDAPI\CategoryController;
use App\Http\Controllers\API\CRUDAPI\ProductController;
use App\Http\Controllers\API\CRUDAPI\VoucherController;
use App\Http\Controllers\API\Order\OrderController;
use App\Http\Controllers\API\Statistics\StatisticsController;
use App\Http\Controllers\Payment\VNPayController;
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


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',[AuthController::class,'getUser']);
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
//brand
Route::prefix('coupon')->group(function () {
    Route::get('/', [VoucherController::class, 'data']);
    Route::post('/', [VoucherController::class, 'create'])->middleware('auth:sanctum');
    Route::post('/edit/{id}', [VoucherController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [VoucherController::class, 'delete'])->middleware('auth:sanctum');
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
//Address
Route::middleware('auth:sanctum')->prefix('address')->group(function(){
    Route::post('/',[AddressController::class,'createAddress']);
});
//payment
Route::middleware('auth:sanctum')->prefix('payment')->group(function(){
    Route::post('/vnpay', [VNPayController::class, 'createPayment']);
});
//order
Route::middleware('auth:sanctum')->prefix('order')->group(function(){
    Route::get('/',[OrderController::class,'getOrder']);
   Route::post('/',[OrderController::class,'placeOrder']);
   Route::put('/',[OrderController::class,'updateStatus']);
});
//chat

Route::middleware('auth:sanctum')->prefix('chat')->group(function(){
    Route::post('/room', [ChatController::class, 'getOrCreateRoom']);
    Route::post('/send', [ChatController::class, 'sendMessages']);
    Route::get('/messages/{room_id}', [ChatController::class, 'getMessagesInRoom']);
    Route::get('/rooms', [ChatController::class, 'getChatAdminPages']);
});
//revewnurs
Route::middleware('auth:sanctum')->prefix('statistics')->group(function () {
    Route::get('/revenue', [StatisticsController::class, 'revenueStatistics']);
    Route::get('/orders', [StatisticsController::class, 'orderStatistics']);
    Route::get('/aov', [StatisticsController::class, 'averageOrderValue']);
    Route::get('/conversion-rate', [StatisticsController::class, 'conversionRate']);
    Route::get('/best-selling-products', [StatisticsController::class, 'bestSellingProducts']);
    Route::get('/stock-status', [StatisticsController::class, 'stockStatus']);
    Route::get('/return-rate', [StatisticsController::class, 'returnRate']);
    Route::get('/order-status', [StatisticsController::class, 'getOrderStatus']);

});
