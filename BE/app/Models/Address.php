<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = [
        'full_name',
        "email",
        "phone",
        "province",
        "district",
        "ward",
        "address",
        "note",
        "user_id"
    ];
}
