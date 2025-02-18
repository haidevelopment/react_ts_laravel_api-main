<?php
namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class OrderPlacedEvent
{
    use Dispatchable, SerializesModels;

    public $user, $cartItems, $total_price, $payment_method, $address_id, $coupon_id, $note;

    public function __construct(User $user, $cartItems, $orderData, $note)
    {
        $this->user = $user;
        $this->cartItems = $cartItems;
        $this->total_price = $orderData['total_price'];
        $this->payment_method = $orderData['payment_method'];
        $this->address_id = $orderData['address_id'];
        $this->coupon_id = $orderData['coupon_id'];
        $this->note = $note;
    }
}
