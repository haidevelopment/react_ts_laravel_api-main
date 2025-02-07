<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;
    protected $fillable = [
        "product_id",
        "sku",
        "price",
        "quantity",
        "weight",
        "image",
        "description",
        "active",
    ];
    public function variantAttributeValue(){
        return $this->hasMany(VariantAttributeValue::class);
    }
}
