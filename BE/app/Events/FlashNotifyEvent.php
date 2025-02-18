<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use Illuminate\Contracts\Queue\ShouldQueue;

class FlashNotifyEvent implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $message;
    public $userId;

    public function __construct($userId,$message)
    {
        $this->message = $message;
        $this->userId = $userId;
    }

    public function broadcastOn()
    {
        return new Channel('flash-notifications.'.$this->userId);
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'time' => now()->toDateTimeString(),
        ];
    }
}
