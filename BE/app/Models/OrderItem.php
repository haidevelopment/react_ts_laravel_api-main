<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $fillable =[
        'order_id',
        'product_id',
        'variant_id',
        'price',
        'quantity',
        'total_price',
    ];
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
    public function product(){
        return $this->belongsTo(Product::class,'product_id');
    }
    public function variant(){
        return $this->belongsTo(Variant::class,'variant_id');
    }
}
