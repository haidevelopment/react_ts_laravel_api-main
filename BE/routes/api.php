<?php

use App\Http\Controllers\API\Auth\AuthController;
use App\Http\Controllers\API\CRUDAPI\CategoryController;
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
Route::middleware('auth:sanctum')->prefix('category')->group(function(){
    Route::get('/',[CategoryController::class,'getData']);
    Route::post('/',[CategoryController::class,'create']);
    Route::post('/edit/{id}',[CategoryController::class,'update']);
    Route::delete('/{id}',[CategoryController::class,'delete']);
});
