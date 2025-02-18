<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;
    protected $fillable =[
        'code',
        'user_id',
        'address_id',
        'coupon_id',
        'total_price',
        'shipping_fee',
        'discount_amount',
        'payment_method',
        'payment_status',
        'order_status',
        'note',
    ];
    public function items(){
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }
    public function address(){
        return $this->belongsTo(Address::class,'address_id');
    }
    public function coupon(){
        return $this->belongsTo(Voucher::class,'coupon_id');
    }
}
