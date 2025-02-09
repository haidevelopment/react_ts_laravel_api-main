<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Services\RequestAPIService\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cart;
    public function __construct(CartService $cart)
    {
        $this->cart = $cart;
    }
    public function getCart(){
      $obj =  $this->cart->data();
      return response()->json($obj);
    }
    public function addToCart(Request $request){
        $obj = $this->cart->addCart($request);
        return response()->json($obj);
    }
    public function updateToCart(Request $request){
        return;
    }
    public function deleteToCart($id){
        $this->cart->deleteCart($id);
        return response()->json(['id'=>$id]);
    }
    public function updateVariantCart(Request $request){
       $obj = $this->cart->updateVariant($request);
       return response()->json($obj);
    }
    public function updateQuantityCart(Request $request){
        $obj = $this->cart->updateQuantityCart($request);
        return response()->json($obj);
     }
}
