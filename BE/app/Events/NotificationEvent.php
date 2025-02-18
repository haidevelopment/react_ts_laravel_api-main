<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NotificationEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $userId;

    public function __construct(User $userId, $message)
    {
        Log::info("🚀 Event Created: User {$this->userId} - Message: {$this->message}");

        $this->message = $message;
        $this->userId = $userId;
    }

    public function broadcastOn(): array
    {

        Log::info("🔊 Broadcasting to: notifications.{$this->userId->id}");

        return [
            new PrivateChannel('notifications.' . $this->userId->id)
        ];
    }
    public function broadcastAs()
    {
        return 'NotificationEvent';
    }
}
