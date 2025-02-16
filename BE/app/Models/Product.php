<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'description',
        'image',
        'weight',
        'quantity',
        'quantity_warning',
        'tags',
        'sku',
        'brand_id',
        'category_id',
        'instructional_images',
        'active'
    ];
    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }
    public function attachments(){
        return $this->hasMany(ProductAttachment::class);
    }
    public function variant(){
        return $this->hasMany(Variant::class);
    }


}
