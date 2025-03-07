<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messenger extends Model
{
    use HasFactory;
    public $fillable = [
        'sender_id',
        'chat_id',
        'messages',
        'type'
    ];
    public function user(){
        return $this->BelongsTo(User::class,'sender_id');
    }

}
