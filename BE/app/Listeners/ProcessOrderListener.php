<?php

namespace App\Listeners;

use App\Events\FlashNotifyEvent;
use App\Events\OrderPlacedEvent;
use App\Http\Controllers\Utilities\UtilitiesController;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessOrderListener implements ShouldQueue
{
    use InteractsWithQueue;
    public $ultis;
    public function __construct(UtilitiesController $ultis)
    {
        $this->ultis = $ultis;
    }

    public function handle(OrderPlacedEvent $event)
    {
        DB::beginTransaction();
        $user = $event->user;

        try {
            $cartItems = $event->cartItems;
            $orderData = [
                'total_price' => $event->total_price,
                'payment_method' => $event->payment_method,
                'address_id' => $event->address_id,
                'coupon_id' => $event->coupon_id,
            ];

            foreach ($cartItems as $item) {
                $variant = Variant::find($item->variant_id);

                if (!$variant || $variant->quantity < $item->quantity) {
                    $message = "Sản phẩm {$item->name} không đủ số lượng.";
                    throw new \Exception($message);
                    broadcast(new FlashNotifyEvent($user->id, $message))->toOthers();
                    DB::rollBack();
                }
            }

            $order = Order::create([
                'code' => $this->ultis->generateOrderCode(),
                'user_id' => $user->id,
                'address_id' => $orderData['address_id'],
                'total_price' => $orderData['total_price'],
                'payment_method' => $orderData['payment_method'],
                'order_status' => $orderData['payment_method'] == 'cod' ? 'new' : 'processing',
                'coupon_id' => $orderData['coupon_id'],
                'note' => $event->note
            ]);

            foreach ($cartItems as $item) {
                $variant = Variant::find($item->variant_id);

                $variant->decrement('quantity', $item->quantity);
                $product = Product::find($variant->product_id);
                if ($product) {
                    $product->decrement('quantity', $item->quantity);
                }
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->id_product,
                    'variant_id' => $item->variant_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total_price' => $item->total,
                ]);
            }

            DB::table('carts')->where('id_user', $user->id)->delete();

            DB::commit();


            $message = "Bạn đã đặt hàng thành công! Thanks";
            broadcast(new FlashNotifyEvent($user->id, $message))->toOthers();


            Log::info($message);
        } catch (\Exception $e) {
            $message = "Lỗi đặt hàng: " . $e->getMessage();
            broadcast(new FlashNotifyEvent($user->id, $message))->toOthers();

            DB::rollBack();
            Log::error($message);
        }
    }
}
