<?php

namespace App\Http\Controllers\API\Order;

use App\Events\FlashNotifyEvent;
use App\Events\NotificationEvent;
use App\Events\OrderPlacedEvent;
use App\Events\UserPresenceEvent;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {

        $user = Auth::user();
        $cartItems = Cart::where('id_user', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Giỏ hàng trống'], 400);
        }

        $orderData = $request->only(['total_price', 'payment_method', 'address_id', 'coupon_id']);
        $note = $request->input('note', null);

        event(new OrderPlacedEvent($user, $cartItems, $orderData, $note));
         sleep(3);
        $latestOrder = Order::with('items.product', 'items.variant.variantAttributeValue.attributeValue', 'items.variant.variantAttributeValue.attribute', 'address', 'coupon')->where('user_id', Auth::id())
            ->where('created_at', '>=', Carbon::now()->subMinutes(3))
            ->latest()
            ->first();
        if ($latestOrder != null) {
            return response()->json($latestOrder);
        }
    }
    public function getOrder()
    {
        $client = Order::with('items.product', 'items.variant.variantAttributeValue.attributeValue', 'items.variant.variantAttributeValue.attribute', 'address', 'coupon')->where('user_id', Auth::id())->orderBy('id','DESC')->get();
        $admin = Order::with('items.product', 'items.variant.variantAttributeValue.attributeValue', 'items.variant.variantAttributeValue.attribute', 'address', 'coupon')->orderBy('id','DESC')->get();
        return response()->json(['client' => $client, 'admin' => $admin]);
    }
    public function updateStatus(Request $request){
        $obj = Order::find($request->id);
        $obj->order_status = $request->order_status;
        $obj->save();
        $data = Order::with('items.product', 'items.variant.variantAttributeValue.attributeValue', 'items.variant.variantAttributeValue.attribute', 'address', 'coupon')->where('id',$obj->id)->first();
        return response()->json($data);
    }
}
