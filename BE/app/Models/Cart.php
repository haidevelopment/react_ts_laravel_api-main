<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = [

        "name",
        "price",
        "image",
        "variant_id",
        "quantity",
        "total",
        "id_product",
        "id_user",
    ];
    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function variant()
    {
        return $this->belongsTo(Variant::class, 'variant_id');
    }
}
