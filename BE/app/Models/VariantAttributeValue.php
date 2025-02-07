<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantAttributeValue extends Model
{
    use HasFactory;
    protected $fillable = [
        'variant_id',
        'attribute_id',
        'attribute_value_id',
    ];
    public function attributeValue(){
        return $this->belongsTo(AttributeValue::class);
    }
    public function attribute(){
        return $this->belongsTo(Attribute::class);
    }
}
